import React from 'react';
import { useIntl } from 'react-intl';

import { Card } from '@patternfly/react-core/dist/js/components/Card/Card';
import { CardBody } from '@patternfly/react-core/dist/js/components/Card/CardBody';
import { CardTitle } from '@patternfly/react-core/dist/js/components/Card/CardTitle';

import NoApplications from './NoApplications';
import { useHasWritePermissions } from '../../hooks/useHasWritePermissions';
import { useSource } from '../../hooks/useSource';
import NoPermissions from './NoPermissions';
import SourceEditModal from '../SourceEditForm/SourceEditModal';

const ApplicationResourcesCard = () => {
  const intl = useIntl();
  const source = useSource();
  const hasRightAccess = useHasWritePermissions();

  return (
    <Card className="card pf-u-m-lg pf-u-mt-0">
      <CardTitle>
        {intl.formatMessage({
          id: 'detail.resources.title',
          defaultMessage: 'Manage connected applications',
        })}
      </CardTitle>
      <CardBody>
        {!hasRightAccess && <NoPermissions />}
        {hasRightAccess && source.applications.length === 0 && <NoApplications />}
        {hasRightAccess && source.applications.length > 0 && <SourceEditModal />}
      </CardBody>
    </Card>
  );
};

export default ApplicationResourcesCard;