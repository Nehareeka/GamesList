import { Directive, EventEmitter, ElementRef, Renderer2, HostListener, Input, Output } from '@angular/core';




function setProperty(renderer: Renderer2, elementRef: ElementRef, propName: string, propValue: any): void {
  renderer.setProperty(elementRef, propName, propValue);
}

@Directive({
  selector: '[appFilter]'
})
export class FilterDirective {
  @Input() public appFilter: any = {
    filterString: '',
    columnName: 'name'
  };
  @Output() public tableChanged: EventEmitter<any> = new EventEmitter();

  @Input()
  public get config(): any {
    return this.appFilter;
  }

  public set config(value: any) {
    this.appFilter = value;
  }

  private element: ElementRef;
  private renderer: Renderer2;

  @HostListener('input', ['$event.target.value'])
  public onChangeFilter(event: any): void {
    this.appFilter.filterString = event;
    this.tableChanged.emit({filtering: this.appFilter});
  }

  public constructor(element: ElementRef, renderer: Renderer2) {
    this.element = element;
    this.renderer = renderer;
    // Set default value for filter
    setProperty(this.renderer, this.element, 'value', this.appFilter.filterString);
  }

}
