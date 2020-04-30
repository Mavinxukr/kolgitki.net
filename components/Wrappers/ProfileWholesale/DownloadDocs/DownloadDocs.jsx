import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { getProfileWholesaleDocuments } from '../../../../services/profile/docs';
import styles from './DownloadDocs.scss';

const DynamicComponentWithNoSSRAccordion = dynamic(
  () => import('../../../Accordion/Accordion'),
  { ssr: false },
);

const DownloadDocs = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    getProfileWholesaleDocuments({}).then(response => setDocuments(response.data));
  }, []);

  return (
    <div className={styles.docsLoad}>
      <h3 className={styles.title}>Скачать документы</h3>
      <ul uk-accordion="multiple: true">
        {documents.map(item => (
          <DynamicComponentWithNoSSRAccordion
            addClassNameWrapper={styles.accordionOpened}
            key={item.id}
            toggled={false}
            title={item.name}
            classNameWrapper={styles.accordionWrapper}
          >
            <ul>
              {item.documents.map(document => (
                <li className={styles.itemDoc} key={document.id}>
                  <p className={styles.itemDocDesc}>{document.name}</p>
                  <a
                    href={document.doc_link}
                    download
                    className={styles.itemLink}
                  >
                    Скачать
                  </a>
                </li>
              ))}
            </ul>
          </DynamicComponentWithNoSSRAccordion>
        ))}
      </ul>
    </div>
  );
};

export default DownloadDocs;
