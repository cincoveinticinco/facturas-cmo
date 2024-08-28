import { Component, Input, OnInit } from '@angular/core';
import { TIPOPERSONA } from '../../../shared/interfaces/typo_persona';
import { VendorService } from '../../../services/vendor.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileboxComponent } from '../../atoms/filebox/filebox.component';
import { CommonModule } from '@angular/common';
import { VENDORFORMSTATUS } from '../../../shared/interfaces/typo_vendor_form_status';
import { GlobalService } from '../../../services/global.service';
import { Subscription, catchError, map, of, switchMap, throwError } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { BlackButtonComponent } from '../../atoms/black-button/black-button.component';
import { environment } from '../../../../environments/environment';
import { FileType } from '../../../shared/interfaces/files_types';
import { MatIconModule } from '@angular/material/icon';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';

@Component({
  selector: 'app-documentation-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FileboxComponent,
    CommonModule,
    BlackButtonComponent,
    MatIconModule,
    TextInputComponent,
  ],
  templateUrl: './documentation-form.component.html',
  styleUrl: './documentation-form.component.css'
})
export class DocumentationFormComponent implements OnInit {

  @Input() typeVendor: any = null;

  readonly TIPOPERSONA = TIPOPERSONA;
  readonly VENDORFORMSTATUS = VENDORFORMSTATUS;
  readonly apiUrlFront = environment.apiUrlFront;

  loading: boolean = false;
  documents: any[] = [];
  documentForm: FormGroup;
  subs: Subscription[] = [];

  nonRequiredDocuments: FileType[] = [FileType.ARLcertification];
  arrayDocuments: FileType[] = [FileType.AdditinalDocs];


  constructor(private _vS: VendorService, private fb: FormBuilder, private _gS: GlobalService, private router: Router) {
    this.documentForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.loadData();
    this.onSubscribeValuesChanges();
  }

  onSubscribeValuesChanges() {
    this.subs.push(this.documentForm.valueChanges.subscribe((valor: any) => {
      const data = {
        typeForm: VENDORFORMSTATUS.VINCULACION,
        form: valor,
      };

      this._vS.setGeneralForm(data);
    }));
  }

  loadData() {
    this.loading = true;

    this.subs.push(this._vS.getDocumentsData().subscribe({
      next: ((data: any) => {
        this.documents = data?.f_vendor_document_types || [];
        this.setFormData();

        this.loading = false;
      })
    }));
  }

  setFormData() {
    this.documents.forEach((doc: any) => {
      doc.isArrayDocuments = this.arrayDocuments.includes(doc.id);

      this.documentForm.addControl(`document_${doc.id}`, new FormArray([]));

      doc?.documents?.forEach((file: any) => {
        this.getArrayForm(doc.id).push(this.newDocGroup(doc, file));
      });

      if (!doc?.documents?.length && !doc.isArrayDocuments) {
        this.getArrayForm(doc.id).push(this.newDocGroup(doc));
      }

    });
  }

  newDocGroup(doc: any, file?: any) {
    let newFileGroup = new FormGroup({
      document_id: new FormControl(file?.document_id || null),
      name: new FormControl( file?.name || '', Validators.required),
      file: new FormControl(file ? this.setDynamicFiles(file) : null),
      link: new FormControl(file?.link),
    });

    if (!this.nonRequiredDocuments.includes(doc.id)) {
      newFileGroup.controls.file.addValidators(Validators.required);
      newFileGroup.controls.file.updateValueAndValidity();
    }

    if (!doc?.isArrayDocuments) newFileGroup.controls.name.disable();

    newFileGroup.controls.file.valueChanges.subscribe((value) => {
      if (value) {
        setTimeout(() => {
          this.submitFile(doc, newFileGroup);
        }, 0);
      } else {
        if (!doc?.isArrayDocuments) this.deleteFile(newFileGroup.get('document_id')?.value);
      }
    })

    return newFileGroup;
  }

  getArrayForm(docId: number) {
    return this.documentForm.get(`document_${docId}`) as FormArray<FormGroup>;
  }

  onSubmit() {
    if (!this.documentForm.invalid) {
      this.subs.push(this._vS.setNextVendorStatus().subscribe({
        next: () => {
          this.router.navigate(['thanks-docs', this._vS.getVendorId()]);
          this.loading = false;
        }
      }));
    } else {
      Object.values(this.documentForm.controls).forEach((control: any) => {
        control?.controls?.forEach((subFile: any) => {
          subFile?.controls?.file?.markAsTouched();
        });
      });
    }
  }

  getErrorMessage(docId: any) {
    let control = this.documentForm.get(`document_${docId}`);
    if (control?.hasError('required') && control?.touched) {
      return 'Este campo es requerido *';
    }

    return;
  }

  submitFile(doc: any, currentFormGroup: FormGroup) {
    this.loading = true;

    const file = {...currentFormGroup.getRawValue()};
    const currentFile = currentFormGroup.getRawValue()?.file;
    const nameFile = this._gS.normalizeString(currentFile?.name);

    this._vS.getPresignedPutURL(nameFile, this._vS.getVendorId()).pipe(
      catchError(() => {
        if (environment?.stage != 'local') {
          currentFormGroup.get('file')?.setValue(null, { emitEvent: false });
          this.loading = false;
          this._gS.openSnackBar('Fallo al guardar el documento, intente de nuevo', '', 5000);
          return throwError(() => new Error('Error al obtener la URL de subida.'));
        } else {
          return of({ id: doc.id, file: currentFile?.file, name: currentFile?.name, key: '', url: '' });
        }
      }),
      map((putUrl: any) => ({
        ...putUrl,
        id: doc.id,
        file: currentFile?.file,
        name: currentFile?.name,
      })),
      switchMap((uploadFile: any) => {
        if (!uploadFile.url) {
          return of({ blobFile: null, uploadFile });
        }
        return new Promise(resolve => {
          uploadFile.file.arrayBuffer().then((blobFile: File) => resolve({ blobFile, uploadFile }));
        });
      }),
      switchMap((blobUpdateFile: any) => {
        const { blobFile, uploadFile } = blobUpdateFile;
        if (!blobFile) {
          return of(uploadFile);
        }
        return this._vS.uploadFileUrlPresigned(<File>blobFile, uploadFile.url, uploadFile.file.type)
          .pipe(
            catchError(() => {
              if (environment?.stage != 'local') {
                currentFormGroup.get('file')?.setValue(null, { emitEvent: false });
                this.loading = false;
                this._gS.openSnackBar('Fallo al guardar el documento, intente de nuevo', '', 5000);
                return throwError(() => new Error('Error al subir el archivo.'));
              } else {
                return of({ ...currentFile?.file, name: currentFile?.name, url: '' });
              }
            }),
            map((value) => value.type == HttpEventType.Response ? uploadFile : null)
          );
      }),
      switchMap(
        (uploadFile: any) => {
          if (!uploadFile) return of(false);

          const link = uploadFile?.url ? `${this._vS.getVendorId()}/${nameFile}` : '';
          currentFormGroup.get('link')?.setValue(link);

          return this._vS.updateVendorDocument({
            vendor_document_type_id: Number(uploadFile.id),
            link: link,
            vendor_document_id: file?.document_id,
            name: file?.name,
          });
        }
      )
    ).subscribe({
      next: (data: any) => {
        currentFormGroup.get('document_id')?.setValue(data?.document_id);
        currentFormGroup.get('document_id')?.updateValueAndValidity();

        this.loading = false;
      }
    });
  }

  updateDocument(doc: any, file: FormGroup) {
    this.loading = true;
    const params = {
      vendor_document_type_id: doc.id,
      vendor_document_id: file.get('document_id')?.value,
      link: file.get('link')?.value,
      name: file.get('name')?.value,
    }

    this._vS.updateVendorDocument(params).subscribe({
      next: (data: any) => {
        file.get('document_id')?.setValue(data?.document_id);
        this.loading = false;
      }
    })
  }

  deleteFile(documentId: number) {
    this.loading = true;

    this._vS.deleteVendorDocument({ document_id: documentId }).subscribe({
      next: () => {
        this.loading = false;
      }
    });
  }

  setDynamicFiles(doc: any) {
    const file = doc.link ? { name: doc.link, url: doc.link } : null;
    return file;
  }

  get fDocuments() {
    return this.documentForm.controls;
  }

  addNewDocument(doc: any) {
    this.getArrayForm(doc.id).push(this.newDocGroup(doc));
  }

  deleteArraydoc(docId: number, index: number, file: FormGroup) {

    const currentFile = file?.get('document_id')?.value;

    if (currentFile) {
      this.deleteFile(currentFile);
    }

    this.getArrayForm(docId).removeAt(index);
  }

  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe());
  }
}
