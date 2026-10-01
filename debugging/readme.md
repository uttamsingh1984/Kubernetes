## Basic Kubetnetes commands

```
kubectl get pod
kubectl get pod --watch
kubectl describe pod static-web-346dfdf (pod name)
kubectl get service
kubectl get ep (service endpoint)
kubectl get deployment
kubectl apply -f abc.yaml
kubectl delete -f abc.yaml
kubectl get events
kubectl logs {padname}
```
# When Pod are not assigned to node (Pod Status: Pending)

## 1. Insufficient
```
resources:
          requests:
            memory: 28Gi
          limits:
            memory: 36Gi
```

## 2. Node Affinity
```
   nodeSelector:
        mynode: demoNode
```

```
kubectl get nodes --show-labels
Describe Node 
kubectl describe node desktop-worker (node name)
Add label
kubectl label nodes desktop-worker mynode=demoNode
Delete Label
kubectl label nodes desktop-worker mynode-
```

## 3. Missing storage class to not able to create Persistent Volume and Persisnent volumn Claim

```
kubectl get pvc  (Persistent Volume Claim)
kubectl get pv   (Persistent Volume)
kubectl get sc   (Storage Class)
```
## 4. Taint Node

```
SET taint
kubectl taint nodes desktop-wroker Taint=true:NoSchedule
Remove taint
kubectl taint nodes desktop-wroker Taint=true:NoSchedule-

```
If we want pod should be scheduled even node is in Tainted.
```
tolerations:
      - key: "Taint"
        operator: "Equal"
        value: "true"
        effect: "NoSchedule"
```


# Now Node Assigned but container creation problem (Pod Status: ContainerCreating)

## 5. Config Map

```
Get the config Map
kubectl get cm

```

## 6. Secret

```
kubectl get secret

```
## 7. Resource Quota

```
kubectl get resourcequota -n default
kubectl get deploy -- get deployment
kubectl get rs   -- get replica set
```
```
apiVersion: v1
kind: ResourceQuota
metadata:
  name: team-compute-quota
  namespace: default # Replace with your target namespace
spec:
  hard:
    # Compute resource totals
    # requests.cpu: "2"
    # requests.memory: 2Gi
    # limits.cpu: "4"
    # limits.memory: 4Gi
    # Object count totals
    pods: "2"  
    services: "5"
```

## 8. Image Pull Back Off

Image name not exists. 
```
   image: static-web-unknown:latest
```

## 9. CrashLoopBackOff

We hav set the resource limit to 200 MB and inside the container putting stress upto 250 MB that why getting runtime error on contaner.
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: stress-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: stress-web
  template:
    metadata:
      labels:
        app: stress-web
    spec:
      containers:
      - name: stress-web-container
        image: polinux/stress
        command: ["stress"]
        args: ["--vm", "1","---vm-bytes","250M","--vm-hang","1"]
        resources:
          requests:
            memory: 100Mi
          limits:
            memory: 200Mi
        ports:
        - containerPort: 80
```

## 10 Health Check failed

Health check command failed that why it is failed after 3 tries.
```
livenessProbe:
         initialDelaySeconds: 30
         periodSeconds: 5
         timeoutSeconds: 10
         exec:
            command:
            - ls
            - /tmp/lp

```

## 11 Init containers
In command return exit 1 which will fail that means init container will fail so it will stop the pod.
```
initContainers:
      - name: install
        image: busybox:1.28
        command: ["exit 1"]
```

## 12 DB connection issue on container start


## 13 Service label selector not matching with pod label

