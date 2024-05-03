from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import *  # Import Document model
from django.core.mail import send_mail
from django.core.paginator import Paginator
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os
from django.core.files.storage import FileSystemStorage

cwd = os.getcwd().replace("\\", "/")
local_directory = cwd+'/media/'


 

# Create your views here.


# //---------------signup api start -----------------------------------//

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


# //---------------signup api end -----------------------------------//


# //---------------login api start -----------------------------------//

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

# //---------------login api end -----------------------------------//


# //---------------forget_password api start -----------------------------------//

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

# //---------------forget_password api end -----------------------------------//


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

def get_product(request):

    product = list(Products.objects.all().values('product').order_by('-Id'))  # Fetch all documents
    # paginator = Paginator(Products, 10)  # 10 documents per page

    # page_number = request.GET.get('page')
    # page_obj = paginator.get_page(page_number)

    # data = list(page_obj.object_list.values())  # Convert queryset to list

    response = {
        'status': True,
        'data': product,
        # 'current_page': page_obj.number,
        # 'total_pages': paginator.num_pages,
    }

    return JsonResponse(response)

def get_product_with_id(request,id):
    try:
        if request.method == "GET":
            response = {}
            
            get_product = Products.objects.filter(Id=id).values().first()
            print("get_product====>", get_product)
            
            if get_product:
                response['status'] = True
                response['status_code'] = 200
                response['data'] = get_product
            else:
                response['status'] = False
                response['status_code'] = 404
                response['message'] = 'Product not found'
            
            return JsonResponse(response)
        else:
            print("this is else clause")
        
    except Exception as e:
        print(e)
        response = {'status': False, 'message': 'Something went wrong'}
        return JsonResponse(response)        


def get_mens_product(request):
    try:
        if request.method == "GET":
            response = {}
            get_men_products = Men.objects.all().values()

            print("get_men_products====>", get_men_products)
            response['status'] = True
            response['status_code'] = 200
            response['data'] = list(get_men_products)

            return JsonResponse(response)
        else:
            print("this is else clause")
        
    except Exception as e:
        print(e)
        response = {'status': False, 'message': 'Something went wrong'}
        return JsonResponse(response)
        
def get_kids_product(request):
    try:
        if request.method == "GET":
            response = {}
            get_kids_products = kids.objects.all().values()

            print("get_kids_products====>", get_kids_products)
            response['status'] = True
            response['status_code'] = 200
            response['data'] = list(get_kids_products)

            return JsonResponse(response)
        else:
            print("this is else clause")
        
    except Exception as e:
        print(e)
        response = {'status': False, 'message': 'Something went wrong'}
        return JsonResponse(response)
    
def get_womens_product(request):
    try:
        if request.method == "GET":
            response = {}
            get_women_products = Women.objects.all().values()

            print("get_women_products====>", get_women_products)
            response['status'] = True
            response['status_code'] = 200
            response['data'] = list(get_women_products)

            return JsonResponse(response)
        else:
            print("this is else clause")
        
    except Exception as e:
        print(e)
        response = {'status': False, 'message': 'Something went wrong'}
        return JsonResponse(response)



# //---------------add_products api start -----------------------------------//

@csrf_exempt
def add_products(request):
    try:
        if request.method == 'POST':
            response = {}
            title=request.POST.get('title')
            description=request.POST.get('description')
            category=request.POST.get('category')
            price=request.POST.get('price')
            quantity=request.POST.get('quantity')
            status=request.POST.get('status')
            size=request.POST.get('size')
            product=request.POST.get('product')
            image=request.FILES.get('image')

            json_data={"title":title,"description":description,"category":category,"price":price,
                       "quantity":quantity,"status":status,"size":size,"product":product,"image":image.name}

            if image is not None:
                UPLOAD_FOLDER = f'{local_directory}documents/doc/'
                fs = FileSystemStorage(location=UPLOAD_FOLDER)
                isExist = os.path.exists(UPLOAD_FOLDER)
                op_name = image.name
                if not isExist:
                    os.makedirs(UPLOAD_FOLDER)
                    file = fs.save(op_name, image)
                    fileurl = fs.url(file)
                else:
                    file = fs.save(op_name,image)


                    
            # data_1=request.POST.get('data')
            # print("data_1====>",data_1)
            # json_data = json.loads(data_1)
            # print("json_data====>",json_data)

            # title = json_data.get('title')
            # # image = json_data.get('image')
            # description = json_data.get('description')
            # category = json_data.get('category')
            # price = json_data.get('price')
            # quantity = json_data.get('quantity')
            # status = json_data.get('status')
            # size = json_data.get('size')
            # product=json_data.get('product')
            # ContactMobile = json_data.get('product')


            
            # if image is not None:
            #     UPLOAD_FOLDER = f'{local_directory}documents/doc/'
            #     fs = FileSystemStorage(location=UPLOAD_FOLDER)
            #     isExist = os.path.exists(UPLOAD_FOLDER)
            #     op_name = image.name
            #     if not isExist:
            #         os.makedirs(UPLOAD_FOLDER)
            #         file = fs.save(op_name, image)
            #         fileurl = fs.url(file)
            #     else:
            #         file = fs.save(op_name,image)

            product_details = Products.objects.create(
                title=title,
                description=description,
                category=category,
                price=price,
                quantity=int(quantity),
                status=status,
                size=size,
                product=product,
                image=op_name,
            )
            # print("product_details====>",product_details)
            response['status'] = True
            response['message'] = 'Details added successfully'
            
            return JsonResponse(response)
    except Exception as e:
        print(e)
        response = {'status': False, 'message': 'Something went wrong'}
        return JsonResponse(response)
    
# //---------------add_products api end -----------------------------------//


# //---------------get all products of add_products api start -----------------------------------//

@csrf_exempt
def fetchproductData(request):

    try:
        if request.method == "GET":
            response = {}
            get_product = Products.objects.all().values()

            print("get_product====>", get_product)
            response['status'] = True
            response['status_code'] = 200
            response['data'] = list(get_product.order_by('-Id'))

            return JsonResponse(response)
        else:
            print("this is else clause")
        
    except Exception as e:
        print(e)
        response = {'status': False, 'message': 'Something went wrong'}
        return JsonResponse(response)
    
# //---------------get all products of add_products api end -----------------------------------//

# //---------------get edit data of  add_products api start -----------------------------------//


@csrf_exempt
def handleEditfetchdata(request, id):
    try:
        if request.method == "GET":
            response = {}
            
            get_doc = Products.objects.filter(Id=id).values().first()
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

# //---------------get edit data of  add_products api end -----------------------------------//


# //---------------on submit  edit data of products api start -----------------------------------//

@csrf_exempt
def edit_products(request):
    try:
        if request.method == 'POST':
            response = {}
            data_1 = request.POST.get('data')
            print("data_1====>", data_1)
            json_data = json.loads(data_1)
            print("json_data====>", json_data)

            document_id = json_data.get('Id')
            title = json_data.get('title')
            description = json_data.get('description')
            category = json_data.get('category')
            price = json_data.get('price')
            quantity = json_data.get('quantity')
            status = json_data.get('status')
            size = json_data.get('size')
            image = json_data.get('image')
            product = json_data.get('product')

            product_entry = Products.objects.filter(Id=document_id)
            if product_entry.exists():
                updated_product_entry = product_entry.update(title=title,
                                                      description=description,
                                                      category=category,
                                                      price=price,
                                                      quantity=int(quantity),
                                                      status=status,
                                                      size=size,
                                                      image=image,
                                                      product=product,
                                                      )

                print("updated_product_entry====>", updated_product_entry)
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

# //---------------on submit  edit data of products api end -----------------------------------//
@csrf_exempt
def ViewsinglefetchData(request, id):
    try:
        if request.method == "GET":
            response = {}
            
            get_doc = Products.objects.filter(Id=id).values().first()
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
def delete_all_products(request):
    status = ""
    try:
        # Delete all records
        Products.objects.all().delete()
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

