import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { GlobalService } from '../../../services/global.service';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { FileboxComponent } from '../../atoms/filebox/filebox.component';

import { SelectOption } from '../../molecules/inf-step-one/inf-step-one.component';
import { PurchaseOrders } from '../../../pages/oc-forms-cmo/oc-forms-cmo.component';
import { SelectInputComponent } from '../../atoms/select-input/select-input.component';
import { MatIconModule } from '@angular/material/icon';
import { catchError, map, of, switchMap, throwError } from 'rxjs';
import { InvoiceLodgingService } from '../../../services/invoiceLodging.service';
import { environment } from '../../../../environments/environment';
import { VendorService } from '../../../services/vendor.service';
import { HttpEventType } from '@angular/common/http';
import { PoOrdersComponent } from '../../molecules/inf-step-one/po-orders/po-orders.component';

@Component({
  selector: 'app-invoice-juridica-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SubtitleComponent,
    TextInputComponent,
    FileboxComponent,
    SelectInputComponent,
    MatIconModule,
    PoOrdersComponent,
  ],
  templateUrl: './invoice-juridica-form.component.html',
  styleUrls: ['./invoice-juridica-form.component.css']
})
export class InvoiceJuridicaFormComponent {
  @Input() vendorInfo: any;
  @Input() purchaseOrders: PurchaseOrders[] | undefined;
  @Input() selectedPurchaseOrders: PurchaseOrders[] | undefined;
  @Input() selectOptionsPo?: SelectOption[];
  @Input() poProjections: any[] = [];
  @Input() notRequiredDocuments: boolean = false;

  @Output() saveForm = new EventEmitter();

  loading = false;

  invoiceJuridicaForm: any;
  availableOptions: any = [];
  errorUploadingDocuments: string[] = [];
  view: string = '';

  ngOnInit(){
    this.globalService.fillInitialInvoiceJuridicaForm(this.invoiceJuridicaForm, this.vendorInfo);
    const anexesLength = this.vendorInfo?.anexes?.length || 0;
    if(anexesLength === 0){
      this.addNewAnexFormGroup();
    }
    this.selectedPurchaseOrders?.forEach((po: PurchaseOrders, index: number) => {
      this.addPurchaseOrderControl();
      this.fillPurchaseOrderControl(index, po.id.toString());
    });

    this.validateRequiredDocuments();
  }

  getFormattedOcOptions(purchaseOrders: PurchaseOrders[]): SelectOption[] {
    return purchaseOrders.map((order: any) => ({
      optionValue: order.id,
      optionName: order.consecutive_codes
    })) || [];
  }

  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private ilsService: InvoiceLodgingService,
    private vendorService: VendorService
  ) {
    this.invoiceJuridicaForm = this.formBuilder.group({
      orderIds: this.formBuilder.array([]),
      personType: this.formBuilder.control({ value: '', disabled: true }),
      documentType: this.formBuilder.control({ value: '', disabled: true }),
      documentNumber: this.formBuilder.control({ value: '', disabled: true }),
      companyName: this.formBuilder.control({ value: '', disabled: true }),
      address: this.formBuilder.control({ value: '', disabled: true }),
      email: this.formBuilder.control({ value: '', disabled: true }),
      electronicInvoice: this.formBuilder.control('', Validators.required),
      socialSecurity: this.formBuilder.control('', Validators.required),
      taxAuditorCertificate: this.formBuilder.control('', Validators.required),
      arlCertificate: this.formBuilder.control('', Validators.required),
      otherAnexes: this.formBuilder.array([]),
    });
  }

  validateRequiredDocuments() {
    if (this.notRequiredDocuments) {
      this.invoiceJuridicaForm.get('electronicInvoice')?.clearValidators();
      this.invoiceJuridicaForm.get('socialSecurity')?.clearValidators();
      this.invoiceJuridicaForm.get('taxAuditorCertificate')?.clearValidators();
      this.invoiceJuridicaForm.get('arlCertificate')?.clearValidators();
    }
  }

  changeView(view: string = '') {
    this.view = view;
  }

  cancelLoading() {
    this.loading = false;
  }

  onSubmit() {
    if (this.invoiceJuridicaForm.valid && this.errorUploadingDocuments.length === 0) {
      this.changeView('confirm-po-orders');
    } else {
      this.invoiceJuridicaForm.markAllAsTouched();
      this.getOtherAnexesArray().markAllAsTouched();
    }
  }

  async submitForm() {
    this.loading = true;
    this.errorUploadingDocuments = [];

    await this.uploadFiles(['electronicInvoice', 'socialSecurity', 'taxAuditorCertificate', 'arlCertificate']);
    await this.uploadFilesFromArrayOfControls(this.getOtherAnexesArray());

    if(this.invoiceJuridicaForm.valid && this.errorUploadingDocuments.length === 0) {
      this.saveForm.emit({
        form: this.invoiceJuridicaForm.value,
        cancelLoading: this.cancelLoading
      });

      this.loading = false;
    } else {
      this.loading = false;
      this.invoiceJuridicaForm.markAllAsTouched();
      this.getOtherAnexesArray().markAllAsTouched();
    }

    this.globalService.openSnackBar('Formulario enviado correctamente', '', 5000);
  }

  getControl(controlName: string) {
    return this.invoiceJuridicaForm?.get(controlName) as FormControl;
  }

  getOtherAnexesArray(): FormArray {
    return this.invoiceJuridicaForm.get('otherAnexes') as FormArray;
  }

  getOtherAnexesControls() {
    return this.getOtherAnexesArray().controls as FormControl[];
  }

  addNewAnexFormGroup() {
    this.getOtherAnexesArray().push(new FormControl(''));
  }

  fillPurchaseOrderControl(index: number, value: string) {
    this.getPurchaseOrdersArray().at(index).setValue(value);
  }

  updateSelectOptionsPo(selectOptionsPo: SelectOption[] | undefined) {
    if (selectOptionsPo) {
      const filteredOptions: SelectOption[] = selectOptionsPo.filter(option => {
        return !this.getOrderIds().value.includes(option.optionValue.toString());
      });
      this.availableOptions = {
        ...this.availableOptions,
        [`${this.getOrderIds().length - 1}`]: filteredOptions
      };
    }
  }

  addPurchaseOrderControl(): void {
    this.getOrderIds().push(this.formBuilder.control(''));
    this.updateSelectOptionsPo(this.selectOptionsPo);
  }

  getOrderIds(): FormArray {
    return this.invoiceJuridicaForm.get('orderIds') as FormArray;
  }

  deletePurchaseOrderControl(index: number): void {
    if(index > 0) {
      this.getOrderIds().removeAt(index);
    }
  }

  getPurchaseOrdersArray(): FormArray {
    return this.invoiceJuridicaForm.get('orderIds') as FormArray;
  }

  getPurchaseOrdersControls() {
    return this.getPurchaseOrdersArray().controls as FormControl[];
  }

  submitFile(event: { value: File; formControl: FormControl }) {
    this.loading = true;
    const { value, formControl } = event;

    const vendorId: any = this.ilsService.getVendorId();

    if (!value) {
      const documentId = formControl.value.document_id;
      if (documentId) {
        this.vendorService.deleteVendorDocument({ document_id: documentId });
      }
    } else {
      const nameFile = this.globalService.normalizeString(value.name);
      const existingUrl = formControl.value.url;
      if (existingUrl) {
        this.loading = false;
        return;
      }

      this.ilsService.getPresignedPutURLOc(nameFile, vendorId, 'register')
      .pipe(
        catchError((error) => {
          if (environment?.stage !== 'local') {
            formControl.setValue(null, { emitEvent: false });
            this.errorUploadingDocuments = [...this.errorUploadingDocuments, nameFile];
            this.globalService.openSnackBar(`Fallo al guardar el documento ${nameFile}`, '', 5000);
            return throwError(() => new Error('Error al subir el archivo.'));
          } else {
            return of({ ...value, url: '' });
          }
        }),
        map((putUrl: any) => ({
          ...putUrl,
          id: value,
          file: value,
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
          return this.vendorService.uploadFileUrlPresigned(<File>blobFile, uploadFile.url, uploadFile.file.type)
            .pipe(
              catchError((_) => {
                if (environment?.stage !== 'local') {
                  formControl.setValue(null, { emitEvent: false });
                  this.globalService.openSnackBar(`Fallo al guardar el documento ${nameFile}`, '', 5000);
                  this.errorUploadingDocuments = [...this.errorUploadingDocuments, nameFile];
                  return throwError(() => new Error('Error al subir el archivo.'));
                } else {
                  return of({ ...value, url: '' });
                }
              }),
              map((value) => value.type == HttpEventType.Response ? uploadFile : null)
            );
        }),
        switchMap((uploadFile: any) => {
          if (!uploadFile) return of(false);
          const document_url = uploadFile?.url ? `${vendorId}/${nameFile}` : '';
          const formControlCurrentValue = formControl.value;
          this.ilsService.signUrl(document_url).subscribe((res: any) => {
            formControl.setValue({
              document_id: formControlCurrentValue?.document_id,
              name: value.name,
              url: res.url,
              document_url: document_url
            });
          });
          return of(true);
        })
      )
      .subscribe((value) => {
      });
    }
  }

  async uploadFiles(controlNames: string[]): Promise<void> {
    for (const controlName of controlNames) {
      const control = this.getControl(controlName);
      const file = control.value?.file;
      if (file) {
        await this.submitFile({ value: file, formControl: control });
        await this.sleep(3000); // Delay de 1 segundo entre subidas
      }
    }
  }

  async uploadFilesFromArrayOfControls(controlArray: FormArray): Promise<void> {
    for (const control of controlArray.controls) {
      const file = control.value?.file;
      if (file) {
        await this.submitFile({ value: file, formControl: control as FormControl });
        await this.sleep(3000);
      }
    }
  }

  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  deleteAnnex(index: number) {
    this.getOtherAnexesArray().removeAt(index);
  }

  thereArePrechargedDocs(): boolean {
    const controlsToCheck = [
      'electronicInvoice',
      'socialSecurity',
      'taxAuditorCertificate',
      'arlCertificate'
    ];

    for (const control of controlsToCheck) {
      if (this.getControl(control)?.value?.url) {
        return true;
      }
    }

    if (this.getOtherAnexesControls().length > 0) {
      for (const anexo of this.getOtherAnexesControls()) {
        if (anexo.value?.url) {
          return true;
        }
      }
    }

    return false;
  }
}
