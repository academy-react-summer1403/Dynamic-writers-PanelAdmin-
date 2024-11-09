import { getItem } from '../../common/storage'
import http from '../../Interceptor'

export const CreateCourse = async () => {
   try{
    const step1 = (JSON.parse(getItem('step1')))
    const step2 = (JSON.parse(getItem('step2')))
    const step3 = (JSON.parse(getItem('step3')))
    const step4 = (JSON.parse(getItem('step4')))
    const classRoomDtosJ = (JSON.parse(getItem('ClassId')))
    const courseLevelDtosJ = (JSON.parse(getItem('CourseLvlId')))
    const teachersJ = (JSON.parse(getItem('TeacherId')))
    const courseTypeDtosJ = (JSON.parse(getItem('CourseTypeId')))
    const termDtosJ = (JSON.parse(getItem('TremId')))

    const data = new FormData()
    data.append('Title', step1.Title)
    data.append('Describe', step1.Describe)
    data.append('MiniDescribe', step1.MiniDescribe)
    data.append('Capacity', parseInt(step1.Capacity))
    data.append('SessionNumber', step2.SessionNumber)
    data.append('CurrentCoursePaymentNumber', step2.CurrentCoursePaymentNumber)
    data.append('CourseTypeId', parseInt(courseTypeDtosJ.value))
    data.append('TremId', termDtosJ.value)
    data.append('ClassId', classRoomDtosJ.value)
    data.append('CourseLvlId', courseLevelDtosJ.value)
    data.append('UniqeUrlString', step1.Title)
    data.append('TeacherId', teachersJ.value)
    data.append('Cost', step3.Cost)
    data.append('Image', step3.Image || '')
    data.append('StartTime', step3.StartTime)
    data.append('EndTime', step3.EndTime)
    data.append('ShortLink', step4.ShortLink)
    data.append('TumbImageAddress', step4.TumbImageAddress || '')
    console.log(data)

    const response = await http.post(`/Course`, data)
    return response

   } catch(err){
    return [err.ErrorMessage]
   }
}