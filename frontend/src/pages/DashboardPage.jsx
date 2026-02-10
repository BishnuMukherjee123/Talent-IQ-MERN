import React from 'react'
import { useLocation } from 'react-router';

function DashboardPage() {
  const location = useLocation();
  console.log(location)
  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage