import { z } from 'zod';
import { FormControl } from './../form-control';


test('formcontrol should have an error', () => {
  const formControl = new FormControl<string>('', z.string().min(2));
  expect(formControl.errors).toBeTruthy()
})

test('should not be dirty if value is the initial', () => {
  const formControl = new FormControl<string>('init')

  expect(formControl.dirty).toBeFalsy()

  formControl.value = 'changed'

  expect(formControl.dirty).toBeTruthy()
})