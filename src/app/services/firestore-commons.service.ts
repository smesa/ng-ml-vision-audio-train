
import { Injectable } from '@angular/core';
import {
  Action, AngularFirestore,
  AngularFirestoreCollection, AngularFirestoreDocument,
  DocumentChangeAction, DocumentSnapshotDoesNotExist,
  DocumentSnapshotExists
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

type CollectionPredicate<Type> = string | AngularFirestoreCollection<Type>;
type DocPredicate<Type> = string | AngularFirestoreDocument<Type>;


@Injectable({
  providedIn: 'root'
})
export class FirestoreCommonsService {

  constructor(
    private afs: AngularFirestore
  ) { }

  get timestamp(): any {
    return firebase.default.firestore.FieldValue.serverTimestamp();
  }

  col<Type>(ref: CollectionPredicate<Type>, queryFn?): AngularFirestoreCollection<Type> {
    return typeof ref === 'string' ? this.afs.collection<Type>(ref, queryFn) : ref;
  }

  doc<Type>(ref: DocPredicate<Type>): AngularFirestoreDocument<Type> {
    return typeof ref === 'string' ? this.afs.doc(ref) : ref;
  }

  doc$<Type>(ref: DocPredicate<Type>): Observable<Type> {
    return this.doc(ref)
      .snapshotChanges()
      .pipe(
        map(
          (doc: Action<DocumentSnapshotDoesNotExist | DocumentSnapshotExists<Type>>) => {
            return doc.payload.data() as Type;
          }),
      );
  }

  col$<Type>(ref: CollectionPredicate<Type>, queryFn?): Observable<Type[]> {
    return this.col(ref, queryFn)
      .snapshotChanges()
      .pipe(
        map((docs: DocumentChangeAction<Type>[]) => {
          return docs.map((doc: DocumentChangeAction<Type>) => doc.payload.doc.data()) as Type[];
        }),
      );
  }

  colWithIds$<Type>(ref: CollectionPredicate<Type>, queryFn?): Observable<any[]> {
    return this.col(ref, queryFn)
      .snapshotChanges()
      .pipe(
        map((docs: DocumentChangeAction<Type>[]) => {
          return docs.map((a: DocumentChangeAction<Type>) => {
            const data: Object = a.payload.doc.data() as Type;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        }),
      );
  }

  add<Type>(ref: CollectionPredicate<Type>, data): Promise<firebase.default.firestore.DocumentReference> {
    const timestamp = this.timestamp;
    return this.col(ref).add({
      ...data,
      updatedAt: timestamp,
      createdAt: timestamp,
    });
  }

  set<Type>(ref: DocPredicate<Type>, data: any): Promise<void> {
    const timestamp = this.timestamp;
    return this.doc(ref).set({
      ...data,
      updatedAt: timestamp,
      createdAt: timestamp,
    });
  }

  update<Type>(ref: DocPredicate<Type>, data: any): Promise<void> {
    return this.doc(ref).update({
      ...data,
      updatedAt: this.timestamp,
    });
  }

  delete<Type>(ref: DocPredicate<Type>): Promise<void> {
    return this.doc(ref).delete();
  }




}
