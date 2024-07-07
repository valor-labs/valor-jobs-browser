import { Injectable } from '@angular/core';
// import * as jsYaml from 'js-yaml';


export enum DifferenceType {
  MainDeleted = "MainDeleted",
  MainAdded = "MainAdded",
  MainChanged = "MainChanged",
  ElementDeleted = "ElementDeleted",
  ElementAdded = "ElementAdded",
}

export interface IDifference {
  type: DifferenceType
  item?: any
  path?: string
  property?: string
  value?: string
  index?: Number
}

const qObjDifferentiator = function (q1: any, q2: any) {
  return q1.title === q2.title && q1.level == q2.level;
}
const jObjDifferentiator = function (j1: any, j2: any) {
  return j1.title === j2.title && j1.seniority === j2.seniority;
}


@Injectable({
  providedIn: 'root'
})
export class ChangesService {

  constructor() { }

  // private loadYaml(yamlString: string): any {
  //   try {
  //     return jsYaml.load(yamlString);
  //   } catch (e) {
  //     console.error('Error parsing YAML string:', e);
  //     return null;
  //   }
  // }
  

  public compareYAMLObjects(type: "jobs"|"qualifications", originalObject: any, changedObject: any): IDifference[] {
    // const originalObject = this.loadYaml(originalYaml);
    // const changedObject = this.loadYaml(changedYaml);

    if (!originalObject) {
      throw new Error("originalObject not specified")
    }
    if (!changedObject) {
      throw new Error("changedObject not specified")
    }

    const differentiator: Function = 
      type === "jobs" ?
        jObjDifferentiator :
        qObjDifferentiator;

    return this.compareRootLists(differentiator, originalObject.list, changedObject.list);
  }


  private compareRootLists(differentiator: Function, listOriginal: Array<Object>, listNew: Array<Object>) : IDifference[] {
    let differences: IDifference[] = [];

    listOriginal.forEach((origItem: any, index) => {

      // check if the original elements still exist in the new list
      const origIteminNewList = listNew.find((newItem: any) => differentiator(origItem, newItem));
      if (!origIteminNewList) {
        differences.push({
          type: DifferenceType.MainDeleted,
          item: origItem,
          index: index,
        })
      } else {

        // if exists, compare items
        const diffs = this.compareRootItems(origItem, origIteminNewList);

        diffs.forEach(diff => {
          diff.index = index;
        })
        differences.push(...diffs);
      }
    });

    listNew.forEach((newItem, index) => {

      // check if new items were created
      const newItemInOrigList = listOriginal.find((origItem: any) => differentiator(newItem, origItem));
      if (!newItemInOrigList) {
          differences.push({
            type: DifferenceType.MainAdded,
            item: newItem,
            index: index,
          })
        }
    });

    return differences;
  }

  private compareRootItems(origItem: Object, newItem: Object) {
    let differences: IDifference[] = [];

    Object.keys(newItem).forEach((key: string) => {
      if (Array.isArray(newItem[key as keyof object])) {

        // example: knowledge where it's an array of strings or materials_and_topics where each element is an object
        let diffs: IDifference[] = this.compare2ndLevelLists(origItem[key as keyof object], newItem[key as keyof object]);
        diffs.forEach(diff => {
          diff.item = newItem
          diff.property = key
        });
        differences.push(...diffs);

      } else if (typeof newItem[key as keyof object] == "object") {

        if (newItem[key as keyof object]) {
          console.log(key, newItem[key as keyof object]);
          throw new Error("Right now there are no such cases when the root property is an object. Typically, it's eaither string or array.")
        }

      } else if (origItem[key as keyof object] != newItem[key as keyof object]) {
        // examples: level, title, category, status or any other simple value

        differences.push({
          type: DifferenceType.MainChanged, 
          item: newItem,
          property: key,
        })
      }
    });


    console.warn("Value update not yet implemented")
    Object.keys(origItem).forEach(key => {

    });

    return differences;
  };



  private compare2ndLevelLists(originalArray: any[], newArray: any[]) {
    const arrDiffs: IDifference[] = [];


    originalArray.forEach((originalElement: any) => {
      if (typeof originalElement === 'string' || typeof originalElement === 'number') {
        // new array does not have the old element
        if (!newArray.includes(originalElement)) {
          arrDiffs.push(
            { type: DifferenceType.ElementDeleted, value: originalElement as string }
          );
        }
      } else {
        const foundEl = newArray.find(elementInNewArray => {
          return JSON.stringify(elementInNewArray) === JSON.stringify(originalElement);
        })

        if (!foundEl) {
          arrDiffs.push(
            { type: DifferenceType.ElementDeleted, value: originalElement.title || (originalElement as string) }
          )
        }

        // arrDiffs.push(...this.find2ndLevelObjects(originalElement, newArray));
      }
    });

    newArray.forEach((elementFromNewArr: any) => {
      if (typeof elementFromNewArr === 'string' || typeof elementFromNewArr === 'number') {
        if (!originalArray.includes(elementFromNewArr)) {
          arrDiffs.push(
            { type: DifferenceType.ElementAdded, value: elementFromNewArr as string }
          );
        }
      } else {
        const foundEl = originalArray.find(elementInOrigArray => {
          return JSON.stringify(elementInOrigArray) === JSON.stringify(elementFromNewArr);
        })

        if (!foundEl) {
          arrDiffs.push(
            { type: DifferenceType.ElementAdded, value: elementFromNewArr.title || (elementFromNewArr as string) }
          )
        }

        // arrDiffs.push(...this.find2ndLevelObjects(newElement, originalArray));
      }
    });

    return arrDiffs;
  }



  // private getDifferences(differentiator: Function, originalObject: any, changedObject: any, path = ''): IDifference[] {
  //   return 
  // }



}
