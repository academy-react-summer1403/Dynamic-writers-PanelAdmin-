import { Link,useNavigate,useLocation } from 'react-router-dom'
import { useEffect, useState, Fragment } from 'react'
import classnames from 'classnames'
import jMoment from 'moment-jalaali'
import * as Icon from 'react-feather'
import { useQuery } from 'react-query'
import { InputGroup, Input, InputGroupText } from 'reactstrap'
import { GetTopNews } from '../../core/Services/api/New/GetTopNews'


const BlogSidebar = ({setQuerySearch}) => {
  const navigate=useNavigate();
  const [data, setData] = useState(null)
  const location=useLocation();


  const { data: APIdataTop ,isLoading} = useQuery({queryKey: ['dataFromAPITop'], queryFn:async()=> await GetTopNews()});

  useEffect(() => {
    if(!isLoading){
      setData(APIdataTop)
    }
  }, [APIdataTop])

  const renderRecentPosts = () => {
    return data.news.map((post, index) => {
      return (
        <div
          key={index}
          className={classnames('d-flex', {
            'mb-2': index !== data.totalCount.length - 1
          })}
        >
          <span className='me-2'>
            <img className={`rounded ${post.currentImageAddressTumb ? "" : "h-100 bg-secondary"}`} src={post.currentImageAddressTumb} width='100' height='70' />
          </span>
          <div>
            <h6 className='blog-recent-post-title' style={{maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
              <Link className='text-body-heading' to={`/News/view/${post.id}`}>
                {post.title}
              </Link>
            </h6>
            <div className='text-muted mb-0'>{(jMoment(post.insertDate).locale('fa').format('jYYYY jMMMM jD'))}</div>
          </div>
        </div>
      )
    })
  }

  return (
    <div className='sidebar-detached sidebar-right'>
      <div className='sidebar'>
        <div className='blog-sidebar right-sidebar my-2 my-lg-0'>
          <div className='right-sidebar-content'>
            <div className='blog-search'>
              <InputGroup className='input-group-merge'>
                <Input placeholder='جستجو کنید' onChange={(value)=>setQuerySearch(value.target.value)} 
                onClick={()=>{
                  if(location.pathname.includes("view")){
                    navigate('/News/list')
                  }}}/>
                <InputGroupText>
                  <Icon.Search size={14} />
                </InputGroupText>
              </InputGroup>
            </div>
            {data !== null ? (
              <Fragment>
                <div className='blog-recent-posts mt-3'>
                  <h6 className='section-label'>اخبار و مقالات اخیر</h6>
                  <div className='mt-75'>{renderRecentPosts()}</div>
                </div>
              </Fragment>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogSidebar
