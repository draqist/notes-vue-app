import { reactive } from 'vue'

function useNote(props: any) {
  if (props.formType === 'create') {
    return {
      noteData: reactive({
        title: '',
        description: '',
        content: ''
      })
    }
  } else {
    return {
      noteData: reactive({
        id: props?.note?.id,
        title: props?.note?.title,
        description: props?.note?.description,
        content: props?.note?.content
      })
    }
  }
}
