kubectl apply -f static-web.yaml;

#check the status of the pods, when the pods is running, the can access the static web page by forwarding the port to your local machine



# when pods is running, run the following command to forward the port to your local machine
# kubectl port-forward svc/static-web-service 8080:80



# kubectl delete -f static-web/static-web.yaml;