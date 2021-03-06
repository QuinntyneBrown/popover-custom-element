﻿import { Rectangle } from "./rectangle";

export class Ruler implements IRuler {
    constructor(private _document: Document = document) {
        this.measure = this.measure.bind(this);
    }

    public measure(element: HTMLElement): Promise<Rectangle> {
        return new Promise((resolve) => {
            if (this._document.body.contains(element)) {
                var result = Rectangle.fromClientRect(element.getBoundingClientRect());
                resolve(result);
            } else {
                setTimeout(() => {
                    this._document.body.appendChild(element);
                    var clientRect = element.getBoundingClientRect();
                    element.parentNode.removeChild(element);
                    var result = Rectangle.fromClientRect(clientRect);
                    resolve(result);
                }, 0);
            }
        });        
    }
}