#!/bin/bash

# Optimized for angular/typescript!

NODE1_EDGE2='if |for |\*ngFor=|\*ngIf=|do |while '
OPERATOR_TERN="\s\?\s.+:|^:|\s+\:"
NODE1_EDGE1='switch '
# Not sure about `else if`
EDGE1='case |default: |else if'

COMMENTS='^ *//|^ */\*\*|^ *\*|^ *<\!--'
SPECIALS='^import '

EXCEPTIONS="$COMMENTS|$SPECIALS"


echo "File: $1"
echo "-----------------------------"

echo "NODE1_EDGE2:"
echo "==============="
egrep -v "$EXCEPTIONS" $1 | grep -Po "$NODE1_EDGE2|$OPERATOR_TERN" | sort -n | uniq -c
count=`egrep -v "$EXCEPTIONS" $1 | grep -Po "$NODE1_EDGE2|$OPERATOR_TERN" | wc -l`
let n=count
let e=count*2
echo "counted: $count n=$n e=$e"

echo "NODE1_EDGE1:"
echo "==============="
egrep -v "$EXCEPTIONS" $1 | egrep -o "$NODE1_EDGE1" | sort -n | uniq -c
count=`egrep -v "$EXCEPTIONS" $1 | egrep -o "$NODE1_EDGE1" | wc -l`
echo "counted: $count n=$count e=$count"
let n=$n+count
let e=$e+count

echo "EDGE1:"
echo "==============="
egrep -v "$EXCEPTIONS" $1 | egrep -o "$EDGE1" | sort -n | uniq -c
count=`egrep -v "$EXCEPTIONS" $1 | egrep -o "$EDGE1" | wc -l`
echo "counted: $count e=$count"
let e=$e+count

echo
echo -n "n and e for $1: "
# fixing to 0, if empty
let n=n+0
let e=e+0
echo "$n : $e"
echo
echo
# for verbosity just add a `v` as second argument
if [ "$2" == "v" ]; then
    echo "NODE1_EDGE2:"
    echo "============"
    ack "$NODE1_EDGE2|$OPERATOR_TERN" $1
    echo
    echo "NODE1_EDGE1:"
    echo "============"
    ack "$NODE1_EDGE1" $1
    echo
    echo "EDGE1:"
    echo "======"
    ack "$EDGE1" $1
    echo
fi
