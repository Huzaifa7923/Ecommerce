//For changing name of title  {react-helmet-async}

import {Helmet} from 'react-helmet-async'

const Meta = ({title,description,keywords}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={description}/>
        <meta name='keywords' content={keywords}/>
    </Helmet>
  )
}

Meta.defaultProps={
    title:'Welcome to Myshop',
    description:'We sell ',
    keywords:'electronics,buy electronics,cheap electronics'
}

export default Meta