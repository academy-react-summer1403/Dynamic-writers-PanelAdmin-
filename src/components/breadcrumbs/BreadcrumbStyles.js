// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'

// ** Icons Imports
import { Link } from 'react-router-dom'

const BreadcrumbsStyles = () => {
  return (
    <Fragment>
      <Breadcrumb listClassName='breadcrumb-slash'>
        <BreadcrumbItem>
          <Link to='#'> خانه </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to='#'> Library </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span> Data </span>
        </BreadcrumbItem>
      </Breadcrumb>

      <Breadcrumb listClassName='breadcrumb-dots'>
        <BreadcrumbItem>
          <Link to='#'> داشبورد </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to='#'> Library </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span> Data </span>
        </BreadcrumbItem>
      </Breadcrumb>

      <Breadcrumb listClassName='breadcrumb-dashes'>
        <BreadcrumbItem>
          <Link to='#'> داشبورد </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to='#'> Library </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span> Data </span>
        </BreadcrumbItem>
      </Breadcrumb>

      <Breadcrumb listClassName='breadcrumb-pipes'>
        <BreadcrumbItem>
          <Link to='#'> داشبورد </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to='#'> Library </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span> Data </span>
        </BreadcrumbItem>
      </Breadcrumb>

      <Breadcrumb listClassName='breadcrumb-chevron'>
        <BreadcrumbItem>
          <Link to='#'> داشبورد </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to='#'> Library </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span> Data </span>
        </BreadcrumbItem>
      </Breadcrumb>
    </Fragment>
  )
}
export default BreadcrumbsStyles
