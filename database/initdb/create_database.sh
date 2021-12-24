#!/bin/bash
set -e

psql -U postgres -w -c "create database soundgif"