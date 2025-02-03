import React, { useEffect, useState } from 'react'
import { type StoryFn, type StoryObj } from '@storybook/react'
import { safeJsonStringify } from '@odigos/ui-utils'
import { Theme } from '@odigos/ui-theme'
import { Code, type CodeProps, ToggleCodeComponent } from '.'

interface Props extends CodeProps {
  darkMode: boolean
}

export default {
  title: 'Components/Code',
  component: Code,
}

// Create a master template for mapping props to render the component
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  const [val, setVal] = useState(false)

  return (
    <Theme.Provider darkMode={darkMode}>
      <ToggleCodeComponent isPrettyMode={val} setIsPrettyMode={setVal} />
      <Code pretty={val} {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  language: 'json',
  flatten: false,
  code: safeJsonStringify({
    odigosVersion: {
      name: 'Odigos Version',
      value: 'v1.0.145',
      explain: 'the version of odigos deployment currently installed in the cluster',
    },
    kubernetesVersion: {
      name: 'Kubernetes Version',
      value: 'v1.32.0',
      explain: 'the version of kubernetes cluster where odigos is deployed',
    },
    tier: {
      name: 'Tier',
      value: 'onprem',
      explain: 'the tier of odigos deployment (community, enterprise, cloud)',
    },
    installationMethod: {
      name: 'Installation Method',
      value: 'odigos-cli',
      explain: 'the method used to deploy odigos in the cluster (helm or odigos cli)',
    },
    numberOfDestinations: 1,
    numberOfSources: 15,
    clusterCollector: {
      enabled: {
        name: 'Enabled',
        value: 'true',
        explain: 'should odigos create a cluster collector in the cluster',
      },
      collectorGroup: {
        name: 'Collector Group',
        value: 'created',
        status: 'success',
        explain: 'is the k8s collectors group object for cluster collector exists in the cluster',
      },
      deployed: {
        name: 'Deployed',
        value: 'true',
        status: 'success',
        explain:
          'deployed means the relevant k8s objects (deployment, configmap, secret, daemonset, etc) were created successfully and are expected to start. It does not mean the relevant pods were actually created, started, or are healthy.',
      },
      collectorReady: {
        name: 'Ready',
        value: 'true',
        status: 'success',
        explain: 'ready means that odigos has detected the collectors group as ready to start collecting/receiving data',
      },
      deploymentCreated: {
        name: 'Deployment',
        value: 'created',
        status: 'success',
        explain: 'is the k8s deployment object for cluster collector exists in the cluster',
      },
      expectedReplicas: {
        name: 'Expected Replicas',
        value: '1',
        explain: 'the number of pods that should be scheduled to run the cluster collector',
      },
      healthyReplicas: {
        name: 'Healthy Replicas',
        value: '1',
        status: 'success',
        explain: 'the number of k8s pods running the updated revision of the cluster collector and are healthy',
      },
      failedReplicas: {
        name: 'Failed Replicas',
        value: '0',
        status: 'success',
        explain: 'the number of k8s pods running the updated revision of the cluster collector and are not healthy',
      },
    },
    nodeCollector: {
      enabled: {
        name: 'Enabled',
        value: 'true',
        explain: 'should odigos deploy node collector daemonset in the cluster',
      },
      collectorGroup: {
        name: 'Collector Group',
        value: 'created',
        status: 'success',
        explain: 'is the k8s collectors group object for node collector exists in the cluster',
      },
      deployed: {
        name: 'Deployed',
        value: 'true',
        status: 'success',
        explain:
          'deployed means the relevant k8s objects (deployment, configmap, secret, daemonset, etc) were created successfully and are expected to start. It does not mean the relevant pods were actually created, started, or are healthy.',
      },
      collectorReady: {
        name: 'Ready',
        value: 'true',
        status: 'success',
        explain: 'ready means that odigos has detected the collectors group as ready to start collecting/receiving data',
      },
      daemonSet: {
        name: 'DaemonSet',
        value: 'created',
        status: 'success',
        explain: 'is the k8s daemonset object for node collector exists in the cluster',
      },
      desiredNodes: {
        name: 'Desired Nodes',
        value: '1',
        explain: 'the number of k8s nodes that should be running the node collector daemonset',
      },
      currentNodes: {
        name: 'Current Nodes',
        value: '1',
        status: 'success',
        explain:
          'the number of k8s nodes that have at least one pod of the node collector daemonset. this number counts the pod objects that were created on this node, regardless of the pod status or revision.',
      },
      updatedNodes: {
        name: 'Updated Nodes',
        value: '1',
        status: 'success',
        explain:
          'the number of k8s nodes that have only the latest version of the node collector daemonset pods. this number counts the pod objects that were created on this node with the latest revision, regardless of the pod status or readiness',
      },
      availableNodes: {
        name: 'Available Nodes',
        value: '1',
        status: 'success',
        explain:
          'the number of k8s nodes that have at least one pod of the node collector daemonset that is ready and available. this number counts the pod objects that were created on this node, regardless of the pod status or revision.',
      },
    },
    isSettled: true,
    hasErrors: false,
  }),
}
