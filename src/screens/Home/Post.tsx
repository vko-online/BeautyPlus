import React from 'react'
import { Dimensions } from 'react-native'
import { Card, Badge, Paragraph, Button, IconButton } from 'react-native-paper'

const { width } = Dimensions.get('window')

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
    <Card onPress={onPress} elevation={0} style={{ backgroundColor: '#fff', width: width / 2 - 9, margin: 3 }}>
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
          <Paragraph numberOfLines={2}>
            { Boolean(type) && <Badge style={{ marginRight: 5 }} size={30}>{type}</Badge> }
            {description}
          </Paragraph>
        ) }
      </Card.Content>
    </Card>
  )
}

export default Post
