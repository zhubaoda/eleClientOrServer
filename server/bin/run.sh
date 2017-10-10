#!/bin/bash
OPT=$1 # start: 后台启动；run：前台启动；
PROJECT_ENV=$2 # development | testing | production

if [[ -z $PROJECT_ENV ]];then
  PROJECT_ENV=production
fi

if [ "$MATRIX_CODE_DIR"x != ""x ]; then
    SERVER_ROOT_PATH=$MATRIX_CODE_DIR
else
    SERVER_ROOT_PATH=$(cd "$(dirname "$0")"; cd ..; pwd)
fi

PROC_NAME=${SERVER_ROOT_PATH}/app.js

PROC_ID=`ps -ef|grep -i ${PROC_NAME}|grep -v "grep"|awk '{print $2}'`

case "$OPT" in
  "start" ) # 运行在后台
  if [[ -z $PROC_ID ]];then
    echo "start..."
    sleep 1
    NODE_ENV=${PROJECT_ENV} node ${PROC_NAME} &
    echo ${PROC_NAME} is running:${PROJECT_ENV}
  else
    echo ${PROC_NAME} is running, pid:${PROC_ID[@]}
  fi
  ;;

  "run" ) # 运行在前台
  if [[ -z $PROC_ID ]];then
    echo "start..."
    sleep 1
    NODE_ENV=${PROJECT_ENV} node ${PROC_NAME}
    echo ${PROC_NAME} is running:${PROJECT_ENV}
  else
    echo ${PROC_NAME} is running, pid:${PROC_ID[@]}
  fi
  ;;

  "stop" ) # 运行在前台
  if [[ -n $PROC_ID ]];then
    kill -9 ${PROC_ID[@]}
    echo ${PROC_NAME} is stoped
  fi
  ;;

  * )
  echo '[start|run]'
  ;;

esac
sleep 15