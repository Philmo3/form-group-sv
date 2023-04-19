import { z } from 'zod';
import { FormControl } from '../form-control';
import { FormGroup } from './../form-group';


test('formgroup should have error', () => {
  const formGroup = new FormGroup<{ 
    first:  FormControl<string>,
    second: FormControl<number> 
  }>(
    {
       first:   new FormControl<string>('', z.string().min(2).max(10)),
       second:  new FormControl<number>(1)
    }
  )

  expect(formGroup.errors.first).toBeTruthy()
})

test('should return control', () => {
  const formGroup = new FormGroup<{ 
    first:  FormControl<string>,
    second: FormControl<number> 
  }>(
    {
       first:   new FormControl<string>('', z.string().min(2).max(10)),
       second:  new FormControl<number>(1)
    }
  )

  expect(formGroup.controls.first.value).toBe('')
})