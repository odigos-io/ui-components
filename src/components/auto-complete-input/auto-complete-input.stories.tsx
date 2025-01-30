import React, { useEffect, useState } from 'react'
import { AddClusterInfoIcon, DeleteAttributeIcon, PiiMaskingIcon, RenameAttributeIcon, SamplerIcon, Theme } from '../..'
import { AutocompleteInput, type AutocompleteInputProps } from '.'
import { type StoryFn, type StoryObj } from '@storybook/react'

interface Props extends AutocompleteInputProps {
  darkMode: boolean
}

export default {
  title: 'Components/AutocompleteInput',
  component: AutocompleteInput,
}

// Create a master template for mapping props to render the component
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  const [val, setVal] = useState('')

  return (
    <Theme.Provider darkMode={darkMode}>
      <AutocompleteInput {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  title: 'Select Action',
  options: [
    {
      id: 'attributes',
      label: 'Attributes',
      icon: PiiMaskingIcon,
      items: [
        {
          id: 'add_cluster_info',
          label: 'Add Cluster Info',
          description: 'Add static cluster-scoped attributes to your data.',
          icon: AddClusterInfoIcon,
        },
        {
          id: 'delete_attribute',
          label: 'Delete Attribute',
          description: 'Delete attributes from logs, metrics, and traces.',
          icon: DeleteAttributeIcon,
        },
        {
          id: 'rename_attribute',
          label: 'Rename Attribute',
          description: 'Rename attributes in logs, metrics, and traces.',
          icon: RenameAttributeIcon,
        },
        {
          id: 'pii-masking',
          label: 'PII Masking',
          description: 'Mask PII data in your traces.',
          icon: PiiMaskingIcon,
        },
      ],
    },
    {
      id: 'sampler',
      label: 'Samplers',
      icon: SamplerIcon,
      items: [
        {
          id: 'error-sampler',
          label: 'Error Sampler',
          description: 'Sample errors based on percentage.',
          icon: SamplerIcon,
        },
        {
          id: 'latency-action',
          label: 'Latency Sampler',
          description: 'Add latency to your traces.',
          icon: SamplerIcon,
        },
        {
          id: 'probabilistic-sampler',
          label: 'Probabilistic Sampler',
          description: 'Sample traces based on percentage.',
          icon: SamplerIcon,
        },
      ],
    },
  ],
}
