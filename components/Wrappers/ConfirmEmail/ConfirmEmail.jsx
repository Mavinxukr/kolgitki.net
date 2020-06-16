import React from 'react';
import Link from 'next/link';
import { cookies} from '../../../utils/getCookies';
import { parseText } from '../../../utils/helpers';
import styles from './ConfirmEmail.scss';
import FormWrapper from '../../Layout/FormWrapper/FormWrapper';
import ButtonRoute from '../../Layout/ButtonRoute/ButtonRoute';
import IconExit from '../../../public/svg/Group795.svg';

const ConfirmEmail = () => (
  <FormWrapper>
    <div className={styles.confirmEmailWrapper}>
      <h4 className={styles.title}>
        {parseText(cookies, 'Регистрация прошла успешно', 'Реєстрація пройшла успішно')}
      </h4>
      <ButtonRoute classNameWrapper={styles.routeWrapper} />
      <Link href="/" prefetch={false}>
        <a className={styles.closeButton}>
          <IconExit />
        </a>
      </Link>
    </div>
  </FormWrapper>
);

export default ConfirmEmail;
