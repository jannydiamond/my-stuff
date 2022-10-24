import React from 'react'
import NavLink from './__styled__/NavLink'
import NavWrapper from './__styled__/NavWrapper'

const Navigation = () => {
  return (
    <NavWrapper>
      <NavLink to="inventory_lists">
        <span>All</span>
      </NavLink>
    </NavWrapper>
  )
}

export default React.memo(Navigation)
