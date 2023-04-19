import { FormControl } from './form-control';

export class FormGroup<TFormControl extends {[T in keyof TFormControl]: FormControl<any>}>{

  private _controls: TFormControl

  get values(): {[Property in keyof TFormControl]: any} {

    const values: any = {}

    for (const key in this._controls) {
      values[key] = this._controls[key].value
    }
    
    return values
  }

  get errors(): {[Property in keyof TFormControl]: {[key: string]: string}}{

    const errors: any = {}

    for (const key in this._controls){
      if(this._controls[key].errors){
        errors[key] = this._controls[key].errors
      }
    }

    return errors
  }

  get controls(): TFormControl {
    return this._controls
  }

  constructor(formsControl: TFormControl){
    this._controls = formsControl
  }

  isValid(): boolean{
    return Object.keys(this.errors).length === 0
  }

}