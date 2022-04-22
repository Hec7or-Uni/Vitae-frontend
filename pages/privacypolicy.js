import { useRouter } from 'next/router'
import { FiArrowLeft } from 'react-icons/fi'
import Layout2 from '../components/Layout2'

export default function PrivacyPolicy () {
  const router = useRouter()
  return (
    <div className='container mx-auto flex gap-x-4 items-start py-8 px-1.5'>
      <button
        onClick={() => router.back()}
        className='flex items-center justify-center w-10 h-10'
      >
        <FiArrowLeft className='text-2xl'/>
      </button>
      <div className='w-full md:w-2/3 lg:1/2 flex flex-col gap-y-2'>
        <h1 className='font-bold text-2xl mb-1.5'>
          Privacy Policy
        </h1>
        <h2 className='font-bold text-lg'>
          Morbi dui congue
        </h2>
        <p className='font-normal text-base'>
          Pretium tortor, habitasse turpis orci luctus. Blandit eleifend aliquet egestas faucibus in aliquam molestie arcu sagittis. Posuere neque, sed cras maecenas. Pulvinar dignissim malesuada pulvinar posuere porttitor ultrices etiam vulputate in. Mauris mauris, eget ullamcorper ultrices diam, nisi, purus turpis sed. Tempus, sit viverra suspendisse ullamcorper varius vel non ipsum.
        </p>
        <h2 className='font-bold text-lg'>
          Mattis volutpat imperdiet tristique
        </h2>
        <p className='font-normal text-base'>
          Id blandit interdum magna commodo cras dictum. Mi mattis volutpat mattis posuere quis velit. Cursus sit sed ullamcorper facilisis hac donec mauris, quam. In dictumst scelerisque condimentum at ullamcorper volutpat. Viverra lacus, eget feugiat facilisis habitant. Mauris aenean praesent non pretium lacus rhoncus nibh sagittis tellus. Ac quisque justo sit ac elementum. At convallis odio orci egestas aliquam molestie viverra feugiat dignissim. Nunc quam aliquam urna, urna, sit proin ullamcorper.
        </p>
        <h2 className='font-bold text-lg'>
          Lectus a velit nunc
        </h2>
        <p className='font-normal text-base'>
          Condimentum leo malesuada nunc est imperdiet porttitor eget diam, in. Elit, mauris tortor imperdiet enim sed convallis. Amet risus et cras feugiat sit.<br/>
          Id elit amet tincidunt quis. Adipiscing netus at penatibus at. Mauris aenean sollicitudin augue pretium egestas et vitae lectus placerat. Sagittis mus in purus cursus habitant vitae orci turpis eu.
        </p>
      </div>
    </div>
  )
}

PrivacyPolicy.getLayout = function getLayout (page) {
  return <Layout2>{page}</Layout2>
}
