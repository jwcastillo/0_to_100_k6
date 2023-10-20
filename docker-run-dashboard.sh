#!/usr/bin/env bash

#
# This script simply executes a provided JavaScript test using
# the local environment established with the `docker-compose`.
#
# Each execution is provided a unique tag to differentiate
# discrete test runs within the Grafana dashboard.
#



docker-compose -f monitoring/docker-compose.yml run -it --rm k6 dashboard report /scripts/results/test-report.html /scripts/results/test_result.html

# for testing without tags
# docker-compose run --rm -T k6 run -<$SCRIPT_NAME

# docker run -v ./:/scripts -p 5665:5665 -it --rm ghcr.io/grafana/xk6-dashboard:latest dashboard replay /scripts/results/test_result.json.gz

# docker run -v ./:/scripts -p 5665:5665 -it --rm ghcr.io/grafana/xk6-dashboard:latest dashboard report /scripts/results/test_result.json.gz /scripts/results/test_result.html