import React, { ReactNode, useContext } from 'react';

import { AuthContext } from '../../context/AuthContext';
import { validateUserPermissions } from '../../utils/validateUserPermissions';

interface ICanAccessProps {
  children: ReactNode
  permissions?: string[]
}

export function CanAccess({ children, permissions }: ICanAccessProps) {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { hasAllPermissions, hasAllRoles } = validateUserPermissions({ user, permissions });

  if (!isAuthenticated || !hasAllPermissions || !hasAllRoles) {
    return null;
  }

  return (
    <>
      {children}
    </>
  );
}
