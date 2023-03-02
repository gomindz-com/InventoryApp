from fpdf import FPDF, HTMLMixin
import store

class PDF(FPDF, HTMLMixin):
    pass

def create_pdffile():
    pdf = PDF()
    pdf.add_page()
    product_count = store.models.Product.objects.all().count()

    pdf.write_html(f"""
    <section>
        <h2>Products - {product_count}</h2>
        <p><b>Hello</b> world. <u>I am</u> <i>tired</i>.</p>
        <p><a href="https://github.com/PyFPDF/fpdf2">PyFPDF/fpdf2 GitHub repo</a></p>
        <p align="right">right aligned text</p>
        <p>i am a paragraph <br />in two parts.</p>
        <font color="#00ff00"><p>hello in green</p></font>
        <font size="7"><p>hello small</p></font>
        <font face="helvetica"><p>hello helvetica</p></font>
        <font face="times"><p>hello times</p></font>
    </section>
    <section>
        <h2>Orders</h2>
        <ul><li>unordered</li><li>list</li><li>items</li></ul>
        <ol><li>ordered</li><li>list</li><li>items</li></ol>
        <br>
        <br>
        <pre>i am preformatted text.</pre>
        <br>
        <blockquote>hello blockquote</blockquote>
        <table width="100%">
        <thead>
            <tr>
            <th width="30%">Product Name</th>
            <th width="70%">Product ID</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>1</td>
            <td>10</td>
            </tr>
            <tr>
            <td>2</td>
            <td>Bob</td>
            </tr>
        </tbody>
        </table>
    </section>
    """)
    pdf.output('static/documents/DailyReport.pdf')




import jinja2
import pdfkit
from datetime import datetime

def create_pdf2():

    client_name = "Frank Andrade"
    item1 = "TV"
    item2 = "Couch"
    item3 = "Washing Machine"

    subtotal1 = 499
    subtotal2 = 399
    subtotal3 = 129
    total = subtotal1 + subtotal2 + subtotal3

    today_date = datetime.today().strftime("%d %b, %Y")
    month = datetime.today().strftime("%B")

    context = {'client_name': client_name, 'today_date': today_date, 'total': f'${total:.2f}', 'month': month,
            'item1': item1, 'subtotal1': f'${subtotal1:.2f}',
            'item2': item2, 'subtotal2': f'${subtotal2:.2f}',
            'item3': item3, 'subtotal3': f'${subtotal3:.2f}'
            }

    template_env = jinja2.Environment(loader=jinja2.FileSystemLoader('jobs'))
    template = template_env.get_template('report.html')
    output_text = template.render(context)

    config = pdfkit.configuration(wkhtmltopdf='/usr/local/bin/wkhtmltopdf')
    output_pdf = 'static/documents/DailyReport.pdf'
    pdfkit.from_string(output_text, output_pdf, configuration=config, css='jobs/style.css')





from twilio.rest import Client

account_sid = ''
authToken = ''
client = Client(account_sid, authToken)

def send_message():

    create_pdf2()

    client.messages.create(
        from_='whatsapp:+14155238886',
        body= "Hi",
        #media_url='https://www.aims.ca/site/media/aims/2.pdf',
        media_url='https://67c7-197-242-131-152.eu.ngrok.io/static/documents/DailyReport.pdf',
        #to='whatsapp:+2207677435',
        to='whatsapp:+2203258685',
        #to='whatsapp:+2205260188',
    )

