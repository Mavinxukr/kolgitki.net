import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { cookies } from '../../../../utils/getCookies';
import { parseText } from '../../../../utils/helpers';
import { getProfileWholesaleDocuments } from '../../../../services/profile/docs';
import styles from './DownloadDocs.scss';
import { ReactAccordion } from '../../../ReactAccordion/ReactAccordion';

const DynamicComponentWithNoSSRAccordion = dynamic(
  () => import('../../../Accordion/Accordion'),
  { ssr: false }
);

const ListItem = ({ document }) => {
  const arrDocLinks = document.doc_link.split('/');
  const arrExtension = arrDocLinks[arrDocLinks.length - 1].split('.');
  const extension = arrExtension[arrExtension.length - 1];

  return (
    <li className={styles.itemDoc} key={document.id}>
      <p className={styles.itemDocDesc}>{document.name}</p>
      <a href={document.doc_link} download className={styles.itemLink}>
        {parseText(cookies, 'Скачать', 'Завантажити')}.{extension}
      </a>
    </li>
  );
};

const DownloadDocs = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    getProfileWholesaleDocuments({}).then(response =>
      setDocuments(response.data)
    );
  }, []);

  const accordionItems = documents
    .filter(item => item.name !== 'Шаблоны')
    .map(item => ({
      uuid: item.id.toString(),
      heading: parseText(cookies, item.name, item.name_ua),
      content: item.documents.map(document => (
        <ListItem key={item.id} document={document} />
      ))
    }));

  const templates = documents.filter(item => item.name === 'Шаблоны');

  return (
    <div className={styles.docsLoad}>
      <h3 className={styles.title}>
        {parseText(cookies, 'Скачать документы', 'Завантажити документи')}
      </h3>
      <ReactAccordion
        items={accordionItems}
        accordionClasses={styles.accordion}
        allowZeroExpanded={true}
        accordionItemClasses={styles.accordion_header}
        accordionButtonClasses={styles.accordion_button}
        accordionPanelClasses={styles.accordion_panel}
        preExpanded={['b']}
      />
      {templates.length > 0 && (
        <div className={styles.templatesBock}>
          <h3 className={styles.titlePatterns}>{templates[0].name}</h3>
          <ul className={styles.listWrapper}>
            {templates[0].documents.map(document => (
              <ListItem document={document} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DownloadDocs;
