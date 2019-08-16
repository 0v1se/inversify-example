/* tslint:disable:max-classes-per-file */
import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

@provide(SimpleComponent)
export class SimpleComponent {
  constructor(@inject("value") private value: string) {}

  public getValue(): string {
    return this.value;
  }
}

@provide(ComplexComponent)
export class ComplexComponent {
  constructor(private simple: SimpleComponent) {}

  public getValue(): string {
    return this.simple.getValue();
  }
}
