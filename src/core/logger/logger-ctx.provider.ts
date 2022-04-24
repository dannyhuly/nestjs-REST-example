
import { Injectable, Scope } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';

type LabelValue = string | number | boolean | null | undefined;

@Injectable({ scope: Scope.DEFAULT })
export class LoggerCtx {
    private _labels: { [label: string]: LabelValue } = {};

    constructor() {
    }

    get labels() {
        return this._labels;
    }

    withLabel(label: string, value: LabelValue) {
        this.labels[label] = value;
        return this;
    }

    withLabels(labels: { [label: string]: LabelValue }) {
        this._labels = { ...this._labels, ...labels }
        return this;
    }
    
    deleteLable(label: string){
        delete this.labels[label];
        return this;
    }
}