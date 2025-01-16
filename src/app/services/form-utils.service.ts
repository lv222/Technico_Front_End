import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FormUtilsService {
  constructor() {}

  // Method to subscribe to form control value changes and capitalize the value
  public capitalizeFormControlValue(control: AbstractControl): Observable<any> {
    return control.valueChanges.pipe(
      map((value: string) => {
        const capitalizedValue = this.capitalize(value);
        control.setValue(capitalizedValue, { emitEvent: false }); // Don't emit event again
        return capitalizedValue;
      })
    );
  }

  // Capitalize function
  private capitalize(value: string): string {
    if (!value) return value; // Handle null or undefined
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(' ');
  }
}
