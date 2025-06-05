import React, {
  useEffect,
  useRef,
  useState,
  ImgHTMLAttributes,
  CSSProperties,
  forwardRef,
  ReactNode,
} from 'react'

interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  /** 加载指示器 - 可以是图片 URL 或 React 节点 */
  loadingIndicator?: string | ReactNode;
  /** 错误提示 - 可以是图片 URL 或 React 节点 */
  errorIndicator?: string | ReactNode;
  rootMargin?: string;
  containerStyle?: CSSProperties;
  imageStyle?: CSSProperties;
  indicatorStyle?: CSSProperties;
}

const LazyImage = forwardRef<HTMLDivElement, LazyImageProps>(({
                                                                src,
                                                                alt,
                                                                width,
                                                                height,
                                                                className = '',
                                                                loadingIndicator = null,
                                                                errorIndicator = null,
                                                                rootMargin = '200px',
                                                                containerStyle = {},
                                                                imageStyle = {},
                                                                indicatorStyle = {},
                                                                ...imgProps
                                                              }, ref) => {
  const imgRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)

  // 合并样式
  const containerStyles: CSSProperties = {
    position: 'relative',
    width: width || '100%',
    height: height || 'auto',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    ...containerStyle,
  }

  const mergedImageStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    ...imageStyle,
  }

  const mergedIndicatorStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    ...indicatorStyle,
  }

  // 使用 Intersection Observer 实现懒加载
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )

    const currentRef = imgRef.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.disconnect()
      }
    }
  }, [rootMargin])

  // 当图片进入视口后加载真实图片
  useEffect(() => {
    if (!isInView) return

    const img = new Image()
    img.src = src
    img.decoding = 'async'

    img.onload = () => {
      setIsLoaded(true)
      setHasError(false)
    }

    img.onerror = () => {
      console.error(`Failed to load image: ${src}`)
      setHasError(true)
    }
  }, [src, isInView])

  // 渲染指示器（加载中或错误状态）
  const renderIndicator = () => {
    if (hasError) {
      // 错误状态
      if (errorIndicator) {
        if (typeof errorIndicator === 'string') {
          return <img
            src={errorIndicator}
            alt="error indicator"
            style={{ ...mergedIndicatorStyle, objectFit: 'contain' }}
          />
        }
        return errorIndicator
      }

      // 默认错误提示
      return (
        <div style={{
          ...mergedIndicatorStyle,
          backgroundColor: 'rgba(255, 0, 0, 0.05)',
          flexDirection: 'column',
          color: '#ff5555',
          padding: '16px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>⚠️</div>
          <div>图片加载失败</div>
        </div>
      )
    }

    // 加载中状态
    if (loadingIndicator) {
      if (typeof loadingIndicator === 'string') {
        return <img
          src={loadingIndicator}
          alt="loading indicator"
          style={{ ...mergedIndicatorStyle, objectFit: 'contain' }}
        />
      }
      return loadingIndicator
    }

    // 默认加载指示器
    return (
      <div style={mergedIndicatorStyle}>
        <svg width="64" height="64" viewBox="0 0 38 38" stroke="#ccc">
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)" strokeWidth="2">
              <circle strokeOpacity=".3" cx="18" cy="18" r="18" />
              <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </g>
        </svg>
      </div>
    )
  }

  return (
    <div
      ref={(node) => {
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }
        imgRef.current = node
      }}
      style={containerStyles}
      className={className}
    >
      {/* 状态指示器 */}
      {(!isLoaded || hasError) && renderIndicator()}

      {/* 真实图片 */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          decoding="async"
          loading="lazy"
          style={mergedImageStyle}
          onError={() => setHasError(true)}
          onLoad={() => setIsLoaded(true)}
          {...imgProps}
        />
      )}
    </div>
  )
})

LazyImage.displayName = 'LazyImage'

export default LazyImage