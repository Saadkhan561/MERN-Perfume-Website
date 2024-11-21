import Head from 'next/head'
import React from 'react'

const Meta = ({title, description, keywords, image, url}) => {
  return (
    <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta name='og:image' content={image} />
        <meta name='og:url' content={url} />
    </Head> 
  )
}

export default Meta