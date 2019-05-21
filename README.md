# hivent-events-api
To use Firestore Google Database from local and behind an enterprise proxy like zscaler, it's needed to set the environnement variable NODE_EXTRA_CA_CERTS.
NODE_EXTRA_CA_CERTS=<ca cert directory>/cert-zscaler.cer

Also, in this case, for npm it's not advisable to set https-proxy and proxy environment variables.