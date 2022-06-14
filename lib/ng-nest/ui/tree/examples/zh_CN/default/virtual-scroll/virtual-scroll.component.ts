import { Component } from '@angular/core';
import { XTreeNode } from '@ng-nest/ui/tree';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-virtual-scroll',
  templateUrl: './virtual-scroll.component.html'
})
export class ExVirtualScrollComponent {
  data: XTreeNode[] = [
    { id: 1, label: '一级 1' },
    { id: 2, label: '一级 2' },
    { id: 3, label: '一级 3' },
    { id: 5, label: '二级 1-1', pid: 1 },
    { id: 6, label: '二级 1-2', pid: 1 },
    { id: 7, label: '二级 1-3', pid: 1 },
    { id: 8, label: '二级 1-4', pid: 1 },
    ...Array.from({ length: 3000 }).map((_, index) => ({ id: 10000 + index, label: `二级 1-${index + 5}`, pid: 1 })),
    { id: 9, label: '二级 2-1', pid: 2 },
    { id: 10, label: '二级 2-2', pid: 2 },
    { id: 11, label: '二级 2-3', pid: 2 },
    { id: 12, label: '二级 2-4', pid: 2 },
    { id: 13, label: '二级 3-1', pid: 3 },
    { id: 14, label: '二级 3-2', pid: 3 },
    { id: 15, label: '二级 3-3', pid: 3 },
    { id: 16, label: '二级 3-4', pid: 3 },
    { id: 21, label: '三级 1-1-1', pid: 5 },
    { id: 22, label: '三级 1-1-2', pid: 5 },
    { id: 23, label: '三级 1-1-3', pid: 5 },
    ...Array.from({ length: 3000 }).map((_, index) => ({ id: 20000 + index, label: `三级 1-1-${index + 4}`, pid: 5 }))
  ];

  dataLazy: XTreeNode[] = JSON.parse(JSON.stringify(this.data));

  getData = (pid?: any): Observable<XTreeNode[]> => {
    return new Observable((x) => {
      let result = this.dataLazy
        .filter((y) => y.pid === pid)
        .map((x) => {
          x.leaf = this.dataLazy.find((y) => y.pid === x.id) ? true : false;
          return x;
        });
      setTimeout(() => {
        x.next(result);
        x.complete();
      }, 500);
    });
  };
}
