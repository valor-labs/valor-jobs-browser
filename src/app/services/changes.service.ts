import { Injectable } from '@angular/core';
import * as jsYaml from 'js-yaml';
import { Diff } from 'diff';


enum DifferenceType {
  MainDeleted = "MainDeleted",
  MainAdded = "MainAdded",
  MainChanged = "MainChanged",
  ElementDeleted = "ElementDeleted",
  ElementAdded = "ElementAdded",
}

interface IDifference {
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
const jObjDifferentiator = function (q1: any, q2: any) {
  return q1.title === q2.title && q1.level == q2.level;
}


@Injectable({
  providedIn: 'root'
})
export class ChangesService {

  constructor() { }

  private loadYaml(yamlString: string): any {
    try {
      return jsYaml.load(yamlString);
    } catch (e) {
      console.error('Error parsing YAML string:', e);
      return null;
    }
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
        let diffs: IDifference[] = this.compare2ndLevelLists(origItem[key as keyof object], newItem[key as keyof object]);
        diffs.forEach(diff => {
          diff.item = newItem
          diff.property = key
        });
        differences.push(...diffs);

      } else if (typeof newItem[key as keyof object] == "object") {
        console.warn("Object comparison not yet implemented")

      } else if (origItem[key as keyof object] != newItem[key as keyof object]) {
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


  private find2ndLevelObjects(obj1: any, arr: any[]) {
    console.warn("Not yet implemented");
  }

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
        this.find2ndLevelObjects(originalElement, newArray)
      }
    });

    newArray.forEach((newElement: any) => {
      if (typeof newElement === 'string' || typeof newElement === 'number') {
        if (!originalArray.includes(newElement)) {
          arrDiffs.push(
            { type: DifferenceType.ElementAdded, value: newElement as string }
          );
        }
      } else {
        this.find2ndLevelObjects(newElement, originalArray)
      }
    });

    return arrDiffs;
  }



  private getDifferences(differentiator: Function, obj1: any, obj2: any, path = ''): IDifference[] {
    
    return this.compareRootLists(differentiator, obj1.list, obj2.list);
  }

  public compareYaml(yamlString1: string, yamlString2: string): string[] {
    const yaml1 = this.loadYaml(yamlString1);
    const yaml2 = this.loadYaml(yamlString2);

    if (!yaml1 || !yaml2) {
      return ['Error loading YAML data'];
    }

    const differences = this.getDifferences(qObjDifferentiator, yaml1, yaml2);
    return this.differenceToText(differences);
  }



  public differenceToText(list: IDifference[]): string[] {
    return list.map((difference: IDifference) => {
      switch (difference.type) {
        case DifferenceType.MainAdded: {
          return `Added item "${difference.item?.category} | ${difference.item?.title} | ${difference.item?.level}"`
        }
        case DifferenceType.ElementAdded: {
          return `Update: ${difference.property} "${difference.value}" added to "${difference.item?.category} | ${difference.item?.title} | ${difference.item?.level}"`
        }
        default: {
          console.error(`${difference.type} - Not implemented`)
          return "Some difference";
        }
      }
    })
  }
}
