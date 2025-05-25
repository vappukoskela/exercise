*** Settings ***
Library             SeleniumLibrary
Library             RequestsLibrary

Suite Setup         Open Browser    ${APP_URL}    chrome
Suite Teardown      Close Browser


*** Variables ***
${APP_URL}      http://localhost:8080
${API_URL}      http://localhost:3003/api/v1/hedgehog/
${NAME}         Test1
${AGE}          4
${SEX}          M


*** Test Cases ***
Open page, fill hedgehog information and submit
    Go To    ${APP_URL}

    # Click The Hedgehog Map
    Wait Until Element Is Visible    id=hedgehog-map    timeout=10s
    Click Element    id=hedgehog-map

    # Fill Hedgehog Form
    Wait Until Element Is Visible    css=input[name="name"]    timeout=5s
    Wait Until Element Is Visible    css=input[name="age"]    timeout=5s
    Input Text    css=input[name="name"]    ${NAME}
    Input Text    css=input[name="age"]    ${AGE}
    Click Element    css=input[name="gender"][value="${SEX}"]
    Capture Page Screenshot    filledform_screenhot.png

    Click Button    css=button[id="submit"]

Confirm Hedgehog Visible in the list
    Go To    ${APP_URL}

    # Find Hedgehog in the list
    Wait Until Element Is Visible    id=hedgehog-list    timeout=5s
    Element Should Be Visible    xpath=//div[@id="hedgehog-list"]//li[text()="${NAME}"]
    Click Element    xpath=//div[@id="hedgehog-list"]//li[text()="${NAME}"]
    Capture Page Screenshot    list_screenhot.png

Delete Hedgehog
    Go To    ${APP_URL}

    # Find Hedgehog in the list
    Wait Until Element Is Visible    id=hedgehog-list    timeout=5s
    Element Should Be Visible    xpath=//div[@id="hedgehog-list"]//li[text()="${NAME}"]
    Click Element    xpath=//div[@id="hedgehog-list"]//li[text()="${NAME}"]
    # Find it's id
    ${hedgehogTitle}=    Get Text    css:h6.MuiTypography-h6
    ${id}=    Evaluate    re.search(r'#(\\d+)', '''${hedgehogTitle}''').group(1)    re

    Create Session    api    ${API_URL}
    ${response}=    DELETE On Session    api    ${id}
    Should Be Equal As Integers    ${response.status_code}    204
