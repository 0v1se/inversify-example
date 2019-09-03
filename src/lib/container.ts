/* tslint:disable:max-classes-per-file */
import { cache } from 'cache-decorator';
import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

@provide(SimpleComponent)
export class SimpleComponent {
  public counter:number = 0;

  constructor(@inject("value") private value: string) {}

  public getValue(): string {
    return this.value;
  }

  @cache()
  public getSomething(): string {
    this.counter++;
    return "some"
  }
}

@provide(ComplexComponent)
export class ComplexComponent {
  constructor(private simple: SimpleComponent) {}

  public getValue(): string {
    return this.simple.getValue();
  }
}
