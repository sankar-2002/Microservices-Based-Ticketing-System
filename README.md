To run the Project the Requirements are -:

The System should have 16GB+ Ram -:
Node, MongoDB Installed
All the dependencies required for all the services (mentioned in package.json)
Docker Desktop Connected to WSL along with kubernates 
Skaffold (For Pod Creation and Deployment automation)


CMDs/Setup Procedure -:

will be required to setup a kubernates-secrets (For JWT, stripe envs)

Will be required to setup ingress :-
Applying ingress-nginx from github gives us loadbalancer and ingress controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.1/deploy/static/provider/cloud/deploy.yaml

skaffold dev (Does all the pod creation and Deployment Stuff)
localhost should render the working app after bypassing browser's safety protocols

Link for the Custom package created for the Project (to avoid redundancy)
-: https://www.npmjs.com/package/@grstickets/common?activeTab=readme



