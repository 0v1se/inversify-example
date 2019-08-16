import { init } from './init';

export class ExternalComponent {
  constructor(private value: string) {}

  public async getValue(): Promise<string> {
    return this.value;
  }
}

init(async container => {
  const ext = new ExternalComponent("resultValue");
  container.bind(ExternalComponent).toConstantValue(ext);
  container.bind("result").toConstantValue(await ext.getValue());
});