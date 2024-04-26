from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Usermaster, Document  # Import Document model
from django.core.mail import send_mail
from django.core.paginator import Paginator
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


# Create your views here.

@csrf_exempt
def signup(request):
    try:
        if request.method == 'POST':
            response = {}
            json_data = json.loads(request.POST.get('data'))

            full_name = json_data.get('fullname')
            email = json_data.get('email')
            password = json_data.get('password')
            confirm_password = json_data.get('confirmpassword')
            mobilenumber = json_data.get('mobilenumber')
            gender = json_data.get('gender')
            countryCode = json_data.get('countryCode')

            # Check if the user already exists
            if Usermaster.objects.filter(email=email).exists():
                response['status'] = False
                response['message'] = 'User with this email already exists'
            elif password != confirm_password:
                response['status'] = False
                response['message'] = 'Passwords do not match'
            else:
                # Create a new user
                user_details = Usermaster.objects.create(
                    fullname=full_name,
                    password=password,
                    confirmpassword=confirm_password,
                    email=email,
                    mobilenumber=mobilenumber,
                    gender=gender,
                    countryCode=countryCode
                )
                response['status'] = True
                response['message'] = 'Signup successful, please login with valid credentials'

                # Send confirmation email
                subject = 'Welcome to our platform'
                message = f'Hello {full_name},\n\nThank you for signing up!\n\nPlease login with your credentials.'
                from_email = 'mobitrailappsec2017@gmail.com'  # Replace with your email
                recipient_list = [email]  # Passing dynamic email ID
                send_mail(subject, message, from_email, recipient_list)

            return JsonResponse(response)

    except Exception as e:
        print(e)
        response = {'status': False, 'message': 'Something went wrong'}
        return JsonResponse(response)


@csrf_exempt
def login(request):
    try:
        if request.method == "POST":
            response = {}
            parsed_data=json.loads(request.POST.get('data'))
            print("parsed_data====>",parsed_data)
            email=parsed_data.get('email')
            password=parsed_data.get('password')

            user=Usermaster.objects.filter(email=email,password=password).first()
            if user is not None:
                response['status'] = True
                response['status_code'] = 200
                response['message'] = 'Login Successfull'
            else:
                response['status'] = False
                response['status_code'] = 404
            return JsonResponse(response)
    except Exception as e:
        print(e)
        response['status'] = False
        response['status_code'] = 404
        return JsonResponse(response)


@csrf_exempt
def forget_password_send_mail(userName,email_id,code):
    try:
        print("in send mail====---")
        ob = smtplib.SMTP("smtp.gmail.com", 587)
        ob.starttls()
        ob.login('*******emailid*******', '******password******')
        msg = MIMEMultipart('alternative')
        msg['From'] = '*******emailid*******'
        msg['To'] = email_id
        msg['Subject'] =" Recover Password"
        html = "Dear " + userName + ", <br><br>" \
 
        html+="User is trying to access the Application Dashboard.<br><br>"
 
        html+="You've requested a password reset for your [Your Company Name] account. To proceed, please use the following verification code:<br><br>"
 
        html+="Verification Code: "+code+"<br><br>"
 
        html+="Please enter this 4-digit code on the password reset page to verify your identity and reset your password.<br><br>"
 
 
        html+="Regards,<br/> Team"
        part1 = MIMEText(html, 'html')
 
        msg.attach(part1)
 
        
        ob.sendmail('*******From emailid*******','******* To emailid*******' , msg.as_string())
        print("Mail is sent successsfully")
        ob.quit()
        # logger.info(f'Response[send_mail]:' + "Mail is sent successsfully")
 
    except Exception as e:
        print("Err: ", e)



@csrf_exempt
def fetchData(request):
    try:
        if request.method == "GET":
            response = {}
            get_doc = Document.objects.all().values()

            print("get_doc====>", get_doc)
            response['status'] = True
            response['status_code'] = 200
            response['data'] = list(get_doc)

            return JsonResponse(response)
        else:
            print("this is else clause")
        
    except Exception as e:
        print(e)
        response = {'status': False, 'message': 'Something went wrong'}
        return JsonResponse(response)
        



@csrf_exempt
def singlefetchData(request, id):
    try:
        if request.method == "GET":
            response = {}
            
            get_doc = Document.objects.filter(Id=id).values().first()
            print("get_doc====>", get_doc)
            
            if get_doc:
                response['status'] = True
                response['status_code'] = 200
                response['data'] = get_doc
            else:
                response['status'] = False
                response['status_code'] = 404
                response['message'] = 'Document not found'
            
            return JsonResponse(response)
        else:
            print("this is else clause")
        
    except Exception as e:
        print(e)
        response = {'status': False, 'message': 'Something went wrong'}
        return JsonResponse(response)

@csrf_exempt
def add_document(request):
    try:
        if request.method == 'POST':
            response = {}
            data_1=request.POST.get('data')
            print("data_1====>",data_1)
            json_data = json.loads(data_1)
            print("json_data====>",json_data)

            Title = json_data.get('title')
            UploadDocumentType = json_data.get('documentType')
            ContactMobile = json_data.get('ContactMobile')
            Emailid = json_data.get('Email')
            Department = json_data.get('department')

            document_details = Document.objects.create(
                Title=Title,
                UploadDocumentType=UploadDocumentType,
                ContactMobile=ContactMobile,
                Emailid=Emailid,
                Department=Department
            )
            print("document_details====>",document_details)
            response['status'] = True
            response['message'] = 'Details added successfully'
            
            return JsonResponse(response)
    except Exception as e:
        print(e)
        response = {'status': False, 'message': 'Something went wrong'}
        return JsonResponse(response)



@csrf_exempt
def edit_document(request):
    try:
        if request.method == 'POST':
            response = {}
            data_1=request.POST.get('data')
            print("data_1====>",data_1)
            json_data = json.loads(data_1)
            print("json_data====>",json_data)
            
            document_id=json_data.get('Id')
            Title = json_data.get('title')
            UploadDocumentType = json_data.get('documentType')
            ContactMobile = json_data.get('ContactMobile')
            Department = json_data.get('department')

            doc_entry=Document.objects.filter(Id=document_id)
            if doc_entry.exists()==True:
                updated_doc_entry=doc_entry.update(Title=Title,
                                                   UploadDocumentType=UploadDocumentType,
                                                   ContactMobile=ContactMobile,
                                                   Department=Department)
                
                print("document_details====>",updated_doc_entry)
                response['status'] = True
                response['message'] = 'Details updated successfully'
                return JsonResponse(response)
            else:
                response['status'] = False
                response['message'] = 'Details not found'
                return JsonResponse(response)
    except Exception as e:
        print(e)
        response = {'status': False, 'message': 'Something went wrong'}
        return JsonResponse(response)





@csrf_exempt
def search_document(request):


    try:
        if request.method == 'GET':
            response = {}
            query_params = request.GET
            contact_mobile = query_params.get('ContactMobile')        
            Department = query_params.get('Department')     
            Title=query_params.get('Title')
           # Filter documents by ContactMobile OR Department
            documents = Document.objects.filter(ContactMobile=contact_mobile) | Document.objects.filter(Department=Department) | Document.objects.filter(Title=Title)  
            print('list_document---->',documents.values('Id'))
            response['status'] = True
            response['message'] = 'Search results'
            response['data'] = list(documents.values())
            return JsonResponse(response)
    except Exception as e:
        print(e)
        response = {'status': False, 'message': 'Something went wrong'}
        return JsonResponse(response)
    

@csrf_exempt
def fetch_documents(request):

    documents = Document.objects.all().order_by('-id')  # Fetch all documents
    paginator = Paginator(documents, 10)  # 10 documents per page

    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    data = list(page_obj.object_list.values())  # Convert queryset to list

    response = {
        'status': True,
        'data': data,
        'current_page': page_obj.number,
        'total_pages': paginator.num_pages,
    }

    return JsonResponse(response)


@csrf_exempt
def delete_all_documents(request):
    status = ""
    try:
        # Delete all records
        Document.objects.all().delete()
        message = "All records deleted successfully."
        status = True
    except Exception as e:
        status = False
        message = f"Error deleting records: {e}"
    
    response = {
        'status': True,
        'message': message
    }

    return JsonResponse(response)





@csrf_exempt
def delete_document(request, id):  # id from URL parameter
    try:
        # Convert id to integer (if required)
        document_id = int(id)

        # Delete document
        Document.objects.filter(Id=document_id).delete()

        message = "Document deleted successfully."
        status = True
        response = {
            'status': status,
            'message': message
        }
        return JsonResponse(response)

    except Document.DoesNotExist:
        status = False
        message = "Document does not exist."
    except Exception as e:
        status = False
        message = f"Error deleting document: {e}"

    response = {
        'status': status,
        'message': message
    }
    return JsonResponse(response)
