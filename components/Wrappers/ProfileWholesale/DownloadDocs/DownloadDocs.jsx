import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { cookies } from '../../../../utils/getCookies';
import { parseText } from '../../../../utils/helpers';
import { getProfileWholesaleDocuments } from '../../../../services/profile/docs';
import styles from './DownloadDocs.scss';
import { Link } from 'react-scroll';

const DynamicComponentWithNoSSRAccordion = dynamic(
  () => import('../../../Accordion/Accordion'),
  { ssr: false },
);

const ListItem = ({ document }) => {
  const arrDocLinks = document.doc_link.split('/');
  const arrExtension = arrDocLinks[arrDocLinks.length - 1].split('.');
  const extension = arrExtension[arrExtension.length - 1];

  return (
    <li className={styles.itemDoc} key={document.id}>
      <p className={styles.itemDocDesc}>{document.name}</p>
      <a
        href={document.doc_link}
        download
        className={styles.itemLink}
      >
        {parseText(cookies, 'Скачать', 'Завантажити')}.{extension}
      </a>
    </li>
  );
};

const DownloadDocs = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    getProfileWholesaleDocuments({}).then(response => setDocuments(response.data));
  }, []);

  return (
    <div className={styles.docsLoad}>
      <h3 className={styles.title}>
        {parseText(cookies, 'Скачать документы', 'Завантажити документи')}
      </h3>
      <ul uk-accordion="multiple: true">
        {documents.map(item => (
          <>
            {item.name !== 'Шаблоны' && (
              <DynamicComponentWithNoSSRAccordion
                addClassNameWrapper={styles.accordionOpened}
                key={item.id}
                toggled={false}
                title={item.name}
                classNameWrapper={styles.accordionWrapper}
              >
                <ul>
                  {item.documents.map(document => <ListItem document={document} />)}
                </ul>
              </DynamicComponentWithNoSSRAccordion>
            ) || (
              <div>
                <h3 className={styles.titlePatterns}>{item.name}</h3>
                <ul className={styles.listWrapper}>
                  {item.documents.map(document => <ListItem document={document} />)}
                </ul>
              </div>
            )}
          </>
        ))}
      </ul>
    </div>
  );
};

export default DownloadDocs;
