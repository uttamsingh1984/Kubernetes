#!/bin/sh
set -eu

POD_NAME=${POD_NAME:-$(hostname)}
CONTAINER_NAME=${CONTAINER_NAME:-${HOSTNAME:-unknown}}
SERVER_IP=${SERVER_IP:-$(hostname -i 2>/dev/null || hostname -I 2>/dev/null || echo unknown)}

cat > /usr/share/nginx/html/server-info.json <<EOF
{
  "podName": "$POD_NAME",
  "containerName": "$CONTAINER_NAME",
  "serverIp": "$SERVER_IP",
  "generatedAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
EOF

exec nginx -g 'daemon off;'
