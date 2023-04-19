import { Schema } from 'zod'

export class FormControl<T>{

  private _value!: T
  private _errors: {[key: string]: string} | undefined = undefined
  private _validator?: Schema
  private _initialValue: T
  private _isDirty: boolean

  get value(): T {
    return this._value
  }

  set value(newValue: T){
    this._isDirty = newValue !== this._initialValue
    this._value = newValue
    
    this.checkForError()
  }

  get dirty(){
    return this._isDirty
  }

  get errors() {
    return this._errors
  }

  constructor(initialValue: T, validator?: Schema){
    this._initialValue = initialValue
    this._validator = validator
    this.value = initialValue
  }

  private checkForError(): void {
    this.resetErrors()
    const safeParseResult = this._validator?.safeParse(this._value)
    
    if(safeParseResult && safeParseResult.success === false){
      safeParseResult.error.errors.forEach(error => {
        this.setError(error.code, error.message)
      })
    }
  }

  setError(key: string, message: string){
    if(!this._errors){
      this._errors = {}
    }
    this._errors[key] = message
  }

  resetErrors(){
    this._errors = undefined
  }

  resetControl(){
    this.value = '' as T
  }

}