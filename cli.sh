#!/usr/bin/env bash
#

USER_NAME=`whoami`
PROJECT_DIR=`pwd`
PROJECT_BUILD_DIR="${PROJECT_DIR}/build"
DOC_DIR="${PROJECT_DIR}/docs"
ETC_DIR="${PROJECT_DIR}/etc"
SMART_CONTRACT_DIR="${PROJECT_DIR}/smart-contract"
SMART_CONTRACT_BUILD_DIR="${SMART_CONTRACT_DIR}/build"
WEB_DIR="${PROJECT_DIR}/web"
WEB_BUILD_DIR="${WEB_DIR}/build"
NPM_MODULES="${WEB_DIR}/node_modules"

function cleanup() {
    rm -rf ${PROJECT_BUILD_DIR}
    rm -rf ${WEB_BUILD_DIR}
    rm -rf ${SMART_CONTRACT_BUILD_DIR}
    rm -rf ${NPM_MODULES}/*
}

function kill_process_by_name() {
    PROC_NAME_KEY_WORD=$1
    PIDS=`ps -efa | grep -i ${PROC_NAME_KEY_WORD} | grep -v grep | awk '{print $2}'`
    if [[ ${#PIDS[@]} -gt 0 ]]; then
        kill ${PIDS}
        wait 10
    fi
}

function build_smart_contract() {
    cd ${SMART_CONTRACT_DIR}
    npm install
    npm run-script build
}

function build_web() {
    cd ${WEB_DIR}
    npm install
    npm run-script build
}

function build_documentation() {
    mkdir -p ${PROJECT_BUILD_DIR}
    cd ${DOC_DIR}

    sudo asciidoctor-pdf -a stem --out-file ${PROJECT_BUILD_DIR}/titelblatt.pdf titelblatt.adoc
    sudo asciidoctor-pdf -a stem --out-file ${PROJECT_BUILD_DIR}/management_summary.pdf management_summary.adoc
    sudo asciidoctor-pdf -a stem --out-file ${PROJECT_BUILD_DIR}/documentation.pdf documentation.adoc
    sudo asciidoctor-pdf -a stem --out-file ${PROJECT_BUILD_DIR}/selbstaendigkeitserklaerung.pdf selbstaendigkeitserklaerung.adoc

    sudo pdfunite ${PROJECT_BUILD_DIR}/titelblatt.pdf \
        ${PROJECT_BUILD_DIR}/management_summary.pdf \
        ${PROJECT_BUILD_DIR}/documentation.pdf \
        ${PROJECT_BUILD_DIR}/selbstaendigkeitserklaerung.pdf \
        ${PROJECT_BUILD_DIR}/semesterarbeit.pdf

    sudo chown `whoami` -R ../build/
    rm ${PROJECT_BUILD_DIR}/selbstaendigkeitserklaerung.pdf \
        ${PROJECT_BUILD_DIR}/documentation.pdf \
        ${PROJECT_BUILD_DIR}/management_summary.pdf \
        ${PROJECT_BUILD_DIR}/titelblatt.pdf
}

function migrate_smart_contract() {
    cd ${SMART_CONTRACT_DIR}
    npm run-script migrate
}

function run_block_chain() {
    cd ${SMART_CONTRACT_DIR}
    kill_process_by_name ganache
    # myth like bonus scare over problem client lizard pioneer submit female collect
    ganache-cli -p 7545 -d 2>&1 > /dev/null &
}

function run_web_server() {
    cd ${WEB_DIR}
    # PRODUCTION MODE: serve -s build
    npm start
}

usage() {
 	echo "Usage: $0 --clean|--build|--run|--documentation"
 	echo "   eg: $0 --clean"
 	exit 1
}

if [[  $# -eq 0 ]]; then
    usage
fi

while [[ $# -gt 0 ]]; do
	case "${1}" in
		--clean)
 			shift 1
 			CLEAN=true
 			;;
		--build)
 			shift 1
 			BUILD=true
 			;;
		--run)
 			shift 1
 			RUN=true
 			;;
 		--documentation)
 			shift 1
 			DOCUMENTATION=true
 			;;
 		*)
 			usage
 			exit 1
			;;
 	esac
done

if [[ ${CLEAN} ]]; then
    cleanup
fi
if [[ ${BUILD} ]]; then
    build_smart_contract
    build_web
fi
if [[ ${DOCUMENTATION} ]]; then
    build_documentation
fi
if [[ ${RUN} ]]; then
    run_block_chain
    migrate_smart_contract
    run_web_server
fi
