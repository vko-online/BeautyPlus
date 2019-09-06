import React from 'react'
import { StyleSheet } from 'react-native'
import { Card, Badge, Paragraph, Button, IconButton } from 'react-native-paper'

export interface IPost {
  title: string
  image: string
  description?: string
  type?: string
}
interface Props {
  onPress?: () => void
  onRightPress?: () => void
  post: IPost
}
function Post ({
  onPress,
  onRightPress,
  post: {
    title,
    image,
    description,
    type
  }
}: Props) {
  return (
    <Card onPress={onPress} elevation={0} style={{ backgroundColor: '#fff' }}>
      <Card.Title
        title={title}
        right={({ size }) => (
          <IconButton
            icon='more-vert'
            size={size}
            onPress={onRightPress}
          />
        )}
      />
      <Card.Content>
        <Card.Cover source={{ uri: image }} />
        { Boolean(description) && (
          <Paragraph numberOfLines={3}>
            { Boolean(type) && <Badge style={{ marginRight: 5 }} size={30}>{type}</Badge> }
            {description}
          </Paragraph>
        ) }
      </Card.Content>
    </Card>
  )
}

export default Post
