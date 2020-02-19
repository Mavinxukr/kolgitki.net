import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { Form } from 'react-final-form';
import {
  isDocumentsDataReceivedSelector,
  documentsSelector,
  userDataSelector,
  isAuthSelector,
} from '../../../../utils/selectors';
import {
  getDocuments,
  deleteDocument,
  uploadDocuments,
} from '../../../../redux/actions/documents';
import Button from '../../../Layout/Button/Button';
import Loader from '../../../Loader/Loader';
import styles from './Docs.scss';

const Docs = () => {
  const documents = useSelector(documentsSelector);
  const isDataReceived = useSelector(isDocumentsDataReceivedSelector);
  const userData = useSelector(userDataSelector);
  const isAuth = useSelector(isAuthSelector);

  const dispatch = useDispatch();

  const onDrop = useCallback((acceptedFiles) => {
    dispatch(uploadDocuments({}, acceptedFiles ));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    if (isAuth) {
      dispatch(getDocuments({ user_id: userData.id }));
    }
  }, [isAuth]);

  if (!isDataReceived) {
    return <Loader />;
  }

  return (
    <div className={styles.profileWholesaleDocs}>
      <h3>Документы</h3>
      <ul className={styles.items}>
        {documents.map(item => (
          <li className={styles.item} key={item.id}>
            <p className={styles.itemDesc}>{item.name}</p>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={item.link}
              className={styles.itemLinkView}
            >
              Просмотреть
            </a>
            <button
              onClick={() => {
                dispatch(
                  deleteDocument(
                    {},
                    {
                      document_id: item.id,
                    },
                  ),
                );
              }}
              className={styles.itemButtonDelete}
              type="button"
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Button
          title="Добавить документ"
          buttonType="button"
          classNameWrapper={styles.buttonAdd}
          viewType="auth"
        />
      </div>
    </div>
  );
};

export default Docs;
