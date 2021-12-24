#!/bin/bash
set -e

psql -U postgres -w postgres -c "create database vozo"