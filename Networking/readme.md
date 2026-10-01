## Network Policy
We can access the test namespace from dev 
```
kubectl exec -it static-web-deployment-59549cd5c4-qdjff -n dev -- curl http://10.244.1.11/index.html
```
But not able to access from UAT
```
kubectl exec -it static-web-deployment-59549cd5c4-llcr6 -n uat -- curl http://10.244.1.11/index.html
```

Get the all api group versions 
```
kubectl api-resources
kubectl get --raw /api
kubectl get --raw /apis
```

